import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LotteryService } from 'src/app/service/lottery.service';
import Swal from 'sweetalert2';
 
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

  
  insert(lotteries: any) {
    // ส่งข้อมูลสลากไปยัง API
    this.lottery_service.lottery_insert(lotteries).subscribe(
      (res) => {
        // ตรวจสอบสถานะการเพิ่มสลาก
        if (res.status === 200) {
          // แสดง SweetAlert2 เมื่อการเพิ่มสลากสำเร็จ
          Swal.fire({
            title: "สำเร็จ",
            text: "เพิ่มสลากเรียบร้อยแล้ว",
            icon: "success"
          });
          // ปิด dialog หลังจากเพิ่มสลากสำเร็จ
          this.dialog.close();
        } 
      },
      (error) => {
        // แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาดในการเพิ่มสลาก
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเพิ่มสลากได้",
          icon: "error"
        });
        console.log(error);
      }
    );
  }
  
   

  generateNumber(){
    this.lottery.lottery_number =Math.floor((Math.random()*1000000)+1).toString().padStart(6,'0');
     
  }
  
  close(){
    this.dialog.close();
  }
  
  
}
