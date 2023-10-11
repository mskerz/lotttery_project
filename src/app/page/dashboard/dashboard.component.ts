 import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   orders_bydaily =Array<any>();
  orders_bymonthly =Array<any>();
  selectedDate:Date | undefined;
  date='';
  month='';
  Daily_Founded = true;
  orderDetailsVisible: { [order_id: string]: boolean } = {}; // ตัวแปรเก็บสถานะการแสดงรายละเอียด

  constructor(private orderService:OrderService){
   }

  ngOnInit() {
     this.FetchReport();
   }
  FetchReport(){
    this.orderService.getDailyReport(this.date).subscribe((data:any) => {
      this.orders_bydaily = data;
    },(err)=>{
      console.log('ไม่พบ');
    });
    this.orderService.getMonthReport(this.month).subscribe((data:any) => {
      this.orders_bymonthly = data;
    });
  }
  toggleOrderDetails(order_id: string) {
    this.orderDetailsVisible[order_id] = !this.orderDetailsVisible[order_id];
  }
  
  SearchDaily(daily:string) {
    
    
    this.orderService.getDailyReport(daily).subscribe((data:any) => {
      this.orders_bydaily = data;
      this.Daily_Founded = true;
    },(err)=>{
      console.log('ไม่พบ');
      this.Daily_Founded = false;
    });
  }
  SearchMonth(month:string) {
    this.orderService.getDailyReport(month).subscribe((data:any) => {
      this.orders_bydaily = data;
    },(err)=>{
      console.error(err);
      console.log('ไม่พบ');
    });
  }
}
