import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as landmark_covert,Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers:[MessageService]
})
export class MainComponent implements OnInit {
  lotteries = Array<Lottery>();
  keyword: string = '';
  value:string = '';
   


  constructor(private lotteryService:LotteryService,private http:HttpClient,private router:Router,private message: MessageService){
    http.get(lotteryService.api_endpoint+'/lotteries').subscribe((data:any)=>{
      this.lotteries =  landmark_covert.toLottery(JSON.stringify(data));
      console.log(this.lotteries);
    })
  }
  ngOnInit(): void {
     this.FetchData;
  }
  
  FetchData() : void {
    this.http.get(this.lotteryService.api_endpoint+'/lotteries').subscribe((data:any)=>{
      this.lotteries =  data
       
    })
  }
  noDataFound:boolean =false;
  SearchLotterybyKeyword(keyword:string,vaule:string) {
    if(keyword && vaule){
      this.lotteryService.getLotteryFromLast3digit(keyword,vaule).subscribe(data=>{
        this.lotteries = landmark_covert.toLottery(JSON.stringify(data));
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

}

