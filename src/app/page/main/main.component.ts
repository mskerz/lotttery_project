import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as landmark_covert,Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  lotteries = Array<Lottery>();
  keyword: string = '';
  SearchLottery:any;
   


  constructor(private lotteryService:LotteryService,private http:HttpClient,private router:Router){
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
 
  SearchLotterybylast_3digit(keyword:string) {
    if(keyword!=''){
      this.lotteryService.getLotteryFromLast3digit(keyword).subscribe(data=>{
        this.lotteries = landmark_covert.toLottery(JSON.stringify(data));
        this.SearchLottery = this.lotteries;
        console.log(this.lotteries);
      });
    }else{
      this.FetchData();
    }

    
    
  }

}

