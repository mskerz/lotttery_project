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
  keywordOptions = [
    { value: 'last3digit', label: '3 เลขท้าย' },
    { value: 'draw_no', label: 'งวดที่' },
    { value: 'set_no', label: 'ชุดที่' }
  ];
  

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
  SearchLotterybyKeyword(keyword:string,vaule:string) {
    if(keyword && vaule){
      this.lotteryService.getLotteryFromKeyword(keyword,vaule).subscribe(data=>{
        this.lotteries = lottery_covert.toLottery(JSON.stringify(data));
        console.log(this.lotteries);
        if (this.lotteries.length === 0) {
          this.showError();
        }
      });

    }else{
      this.FetchData();
    }

    
    
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



