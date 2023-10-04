import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditLotteryComponent } from 'src/app/dialog/edit-lottery/edit-lottery.component';
import { InsertLotteryComponent } from 'src/app/dialog/insert-lottery/insert-lottery.component';
import { Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';
import Swal from 'sweetalert2';

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

  Edit(lottery:any) {
     
     this.lotteryService.lotteries = lottery;
    this.dialog.open(EditLotteryComponent,{
      minWidth:'300px',
    });
  }

  delete(id:number){
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "แน่ใจหรือไม่ว่าคุณต้องการลบสลากนี้",
      icon: "warning", // รูปไอคอนแจ้งเตือน
      showCancelButton: true, // แสดงปุ่มยกเลิก
      confirmButtonColor: "#d33", // สีของปุ่มยืนยัน (สีแดง)
      cancelButtonColor: "#939393", // สีของปุ่มยกเลิก (สีเทาเข้ม)
      confirmButtonText: "ลบ", // ข้อความปุ่มยืนยัน
      cancelButtonText: "ยกเลิก" // ข้อความปุ่มยกเลิก
    }).then((result)=>{
      if(result.isConfirmed){
        this.lotteryService.delete(id).subscribe((response)=>{
          Swal.fire({
            title: "สำเร็จ",
            text: "ลบสลากเรียบร้อยแล้ว",
            icon: "success"
          });
          this.fetchLottery();
        },(error)=>{
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบสลากได้",
            icon: "error"
          });
        });
      }
    })
      
    
  }
}
