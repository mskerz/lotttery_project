import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as lottery_covert,Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LocationStrategy } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent {
  lotteries = Array<Lottery>();
  
  keyword: string = '';
  value:string = '';
  IsLoggedIn = false;
  user:any;
  digit_1='';
  digit_2='';
  digit_3='';
  last3digit = (this.digit_1.toString()+this.digit_2.toString()+this.digit_3.toString());
  draw_no = '';
  set_no = '';
  

  constructor(private lotteryService:LotteryService,private http:HttpClient,private router:Router,private message: MessageService,private CartService:CartService){
    
   
    this.http.get<any[]>(this.lotteryService.api_endpoint + '/lotteries').subscribe((data) => {
      this.lotteries = data.map((item) => {
        // แปลงข้อมูล JSON ให้อยู่ในรูปแบบที่คุณต้องการ
        return {
          idx: item.idx,
          lottery_number: item.lottery_number.toString().padStart(6, '0'), // เติม 0 นำหน้าถ้ามีน้อยกว่า 6 หลัก
          draw_no: item.draw_no,
          set_no: item.set_no,
          price: item.price,
          lottery_quantity: item.lottery_quantity
        };

      });
      console.log(this.lotteries);
    });
    const user_current = localStorage.getItem('currentUser');
    if(user_current){
      this.IsLoggedIn = true;
      this.user = JSON.parse(user_current);
    }
    

  }
  ngOnInit(): void {
      
     this.FetchData;
     if(this.IsLoggedIn){
      if( this.user.roles == 'member'){
        this.router.navigate(['/member/lottery']);
      }else if( this.user.roles == 'admin'){
        this.router.navigate(['/admin/lottery']);
      }
     }else{
      this.router.navigate(['/lottery']);
     }
     
      
  }
  
  FetchData() : void {
    this.http.get<any[]>(this.lotteryService.api_endpoint + '/lotteries').subscribe((data) => {
      this.lotteries = data.map((item) => {
        // แปลงข้อมูล JSON ให้อยู่ในรูปแบบที่คุณต้องการ
        return {
          idx: item.idx,
          lottery_number: item.lottery_number.toString().padStart(6, '0'), // เติม 0 นำหน้าถ้ามีน้อยกว่า 6 หลัก
          draw_no: item.draw_no,
          set_no: item.set_no,
          price: item.price,
          lottery_quantity: item.lottery_quantity
        };
      });
      console.log(this.lotteries);
    });
    
  }
  noDataFound:boolean =false;
 
   reset(){
    this.digit_1 = '';
    this.digit_2 = '';
    this.digit_3 = '';
    this.draw_no = '';
    this.set_no = '';
   }
  

  showError() {
    Swal.fire({
      icon: 'error',
      title:'แจ้งเตือน',
      text:'ไม่พบหมายเลขสลากที่คุณค้นหา'
    })
  }

  addToCart(lottery:Lottery){
     

    this.CartService.addItemtoCart(lottery);
    // window.alert("You Lottery has been added to your cart.");
  }
 
  SearchLotterybyKeyword(keyword:string,vaule:string){
    this.last3digit = (this.digit_1.toString()+this.digit_2.toString()+this.digit_3.toString());
    if(keyword==='last3digit'){
      this.value = this.last3digit;
      console.log(this.value);
    } 
    if(keyword&&vaule){
      this.lotteryService.getLotteryFromKeyword(keyword,vaule).subscribe((data)=>{
        this.lotteries = data.map((item) => {
          // แปลงข้อมูล JSON ให้อยู่ในรูปแบบที่คุณต้องการ
          return {
            idx: item.idx,
            lottery_number: item.lottery_number.toString().padStart(6, '0'), // เติม 0 นำหน้าถ้ามีน้อยกว่า 6 หลัก
            draw_no: item.draw_no,
            set_no: item.set_no,
            price: item.price,
            lottery_quantity: item.lottery_quantity
          };
        });
        console.log(this.lotteries);
        
        if (this.lotteries.length === 0) {
          this.showError();
        }
      });
    }else{
      this.FetchData();
    }
    
  }

}



