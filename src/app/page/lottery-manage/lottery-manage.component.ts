import { Component, OnInit } from '@angular/core';
import { Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
  selector: 'app-lottery-manage',
  templateUrl: './lottery-manage.component.html',
  styleUrls: ['./lottery-manage.component.scss']
})
export class LotteryManageComponent implements OnInit {
  lotteries = Array<Lottery>();
   constructor(private lotteryService: LotteryService){
    
  }
  ngOnInit(){
    this.fetchLottery();
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
      console.log(this.lotteries);
    });
  }
}
