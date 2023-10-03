import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
  selector: 'app-insert-lottery',
  templateUrl: './insert-lottery.component.html',
  styleUrls: ['./insert-lottery.component.scss']
})
export class InsertLotteryComponent implements OnInit {
 draw_set:any;
 lottery={
  lottery_number : '',
  draw_no : '',
  set_no : '',
  price :80,
  lottery_quantity : 0
 }
  // lottery_number = '';
  // draw_no = 0;
  // set_no = 0;
  // price= 0;
  // lottery_quantity = 0;
 constructor(private http:HttpClient,private lottery_service:LotteryService,private dialog:MatDialogRef<InsertLotteryComponent>){
     
 }
  ngOnInit() {
    this.http.get(this.lottery_service.api_endpoint+"/draw_set").subscribe(data=>{
      this.draw_set = data;
     });  
  }

  
  insert(lotteries: any){
      this.lottery_service.lottery_insert(lotteries).subscribe((res)=>{
          console.log(res.status);
          console.log(res.body);
           
          this.dialog.close();
      });
  }
   

  generateNumber(){
    this.lottery.lottery_number =Math.floor((Math.random()*1000000)+1).toString().padStart(6,'0');
     
  }
  
  close(){
    this.dialog.close();
  }
  
  
}
