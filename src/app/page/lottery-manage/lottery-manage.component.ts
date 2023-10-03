import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsertLotteryComponent } from 'src/app/dialog/insert-lottery/insert-lottery.component';
import { Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
  selector: 'app-lottery-manage',
  templateUrl: './lottery-manage.component.html',
  styleUrls: ['./lottery-manage.component.scss']
})
export class LotteryManageComponent implements OnInit {
  lotteries = Array<Lottery>();
   constructor(private lotteryService: LotteryService,private dialog:MatDialog){
    
  }
  ngOnInit(){
    this.fetchLottery();
  }
  openInsert(){
       this.dialog.open(InsertLotteryComponent,{
        minWidth: '300px'
      }).afterClosed().subscribe(result=>{
        if(result){
          console.log('รับค่าจาก InsertLotteryComponent:', result);
        }
      })
       
       
  }
  alert(){
    window.alert(" แก้ไข และ ลบ ")
  }
  fetchLottery(){
    this.lotteryService.GetLottery().subscribe((data)=>{
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
      
    });
  }
}
