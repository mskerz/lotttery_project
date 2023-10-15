 import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   orders_bydaily =Array<any>();
  orders_bymonthly =Array<any>();
  selectedDate: Date= new Date();;
  SelectedMonthly= new Date();
  stringdate='';
  date='';
  month='';
  Details_Daily: { [order_id: string]: boolean } = {}; // ตัวแปรเก็บสถานะการแสดงรายละเอียด
  orderDetailsVisible: { [order_id: string]: boolean } = {}; // ตัวแปรเก็บสถานะการแสดงรายละเอียด
  total_daily=0;
  constructor(private orderService:OrderService){
   }

  ngOnInit() {
       this.FetchReport();
   }
  
  log(){
    console.log(formatDate(this.SelectedMonthly,'MM/yyyy', 'en-US'));
  }
   
  FetchReport(){
    this.orderService.getDailyReport(this.date).subscribe((data:any) => {
      this.orders_bydaily = data;
      this.calculateTotalDaily();
  
    });
    this.orderService.getMonthReport(this.month).subscribe((data:any) => {
      this.orders_bymonthly = data;
    });
  }
  toggleDaily(order_id:string){
    this.Details_Daily[order_id] = !this.Details_Daily[order_id];
  }
  toggleOrderDetails(order_id: string) {
    this.orderDetailsVisible[order_id] = !this.orderDetailsVisible[order_id];
  }
  
  SearchDaily(selectedDate:Date) {

    this.date = formatDate(this.selectedDate,'yyyy-MM-dd', 'en-US');
    this.orderService.getDailyReport(this.date).subscribe((data:any) => {
      this.orders_bydaily = data;
      console.log(this.date);
      console.log(this.orders_bydaily);
      this.calculateTotalDaily();

     });
     
  }
  calculateTotalDaily() {
    this.total_daily = this.orders_bydaily.reduce((total, order) => total + order.total_order_price, 0);
  }
  SearchMonth(month:string) {
    this.orderService.getDailyReport(month).subscribe((data:any) => {
      this.orders_bymonthly = data;
    },(err)=>{
      console.error(err);
      console.log('ไม่พบ');
    });
  }
}
