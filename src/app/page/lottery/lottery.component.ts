import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as lottery_covert,Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/service/cart.service';

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
  last3digit =(this.digit_1+this.digit_2+this.digit_3);
  draw_no = 0;
  set_no = 0;
  

  constructor(private title:Title,private lotteryService:LotteryService,private http:HttpClient,private router:Router,private message: MessageService,private CartService:CartService){
    
   
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
    this.title.setTitle('Lotterie Shop Search')
     
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

  Search(digit_3last:string,draw_no:number,set_no:number){
    this.last3digit = (this.digit_1.toString()+this.digit_2.toString()+this.digit_3.toString());
    console.log(this.last3digit);
      this.lotteryService.SearchLottery(digit_3last,draw_no,set_no).subscribe(data=>{
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
        if (this.lotteries.length === 0) {
          this.showError();
        }
       });
  
   }
   reset(){
    this.digit_1 = '';
    this.digit_2 = '';
    this.digit_3 = '';
    this.draw_no = 0;
    this.set_no = 0;
   }
  

  showError() {
    this.message.add({
       severity: 'error',
       summary: 'ไม่พบสลากที่ค้นหา',
       detail: 'กรุณาทำการค้นหาอีกครั้ง' });
  }

  addToCart(lottery:Lottery){
     

    this.CartService.addItemtoCart(lottery);
    // window.alert("You Lottery has been added to your cart.");
  }

}



