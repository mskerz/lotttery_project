import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LotteryService } from 'src/app/service/lottery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-lottery',
  templateUrl: './edit-lottery.component.html',
  styleUrls: ['./edit-lottery.component.scss']
})
export class EditLotteryComponent {
  lottery:any;
  draw_set:any;
  response:any;
  constructor(private lotteryService: LotteryService,private http:HttpClient,private dialog:MatDialogRef<EditLotteryComponent>){
    
  }
  ngOnInit(){
    this.lottery =this.lotteryService.lotteries;
    this.http.get(this.lotteryService.api_endpoint+"/draw_set").subscribe(data=>{
      this.draw_set = data;
     });  
  }
  update() {
    // ตรวจสอบว่า lottery_number ถูกส่งมาให้ API และมีค่าที่ถูกต้อง
   
    if (this.lottery.lottery_number) {
      console.log(this.lottery.lottery_number);
      
      this.http.put(this.lotteryService.api_endpoint + "/lottery/edit/" + this.lottery.idx, this.lottery, { observe: 'response' }).subscribe(
        (res) => {
          // แสดง SweetAlert2 เมื่อการอัปเดตสำเร็จ
          Swal.fire({
            title: "สำเร็จ",
            text: "อัปเดตข้อมูลเรียบร้อยแล้ว",
            icon: "success"
          });
          console.log(res);
          this.close();
          // ทำอื่นๆ ที่คุณต้องการหลังจากการอัปเดตสำเร็จ
        },
        (error) => {
          // แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาดในการอัปเดต
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถอัปเดตข้อมูลได้",
            icon: "error"
          });
          console.log(error);
          // ทำอื่นๆ ที่คุณต้องการเมื่อเกิดข้อผิดพลาดในการอัปเดต
        }
      );
    } else {
      // แสดง SweetAlert2 เมื่อ lottery_number ไม่ถูกส่งมาหรือมีค่าว่างเปล่า
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอก lottery_number",
        icon: "error"
      });
    }
  }
  

  close(){
    this.dialog.close();
  }
}
