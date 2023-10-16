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
  total_monthly=0;
  constructor(private orderService:OrderService){
   }

  ngOnInit() {
       this.FetchReport();
   }
  
   
   
  FetchReport(){
    let currentDate = new Date();
    this.date = formatDate(currentDate,'yyyy-MM-dd', 'en-US');
    this.orderService.getDailyReport(this.date).subscribe((data:any) => {
      this.orders_bydaily = data;
      this.calDaily();
  
    });
    this.month = formatDate(currentDate,'MM-yyyy', 'en-US')
    this.orderService.getMonthReport(this.month).subscribe((data:any) => {
      this.orders_bymonthly = data;
      this.calMonthly();
    });
  }
  toggleDaily(order_id:string){
    this.Details_Daily[order_id] = !this.Details_Daily[order_id];
  }
  toggleOrderDetails(order_id: string) {
    this.orderDetailsVisible[order_id] = !this.orderDetailsVisible[order_id];
  }
  calDaily() {
    this.total_daily = this.orders_bydaily.reduce((total, order) => total + order.total_order_price, 0);
  }
  calMonthly(){
    this.total_monthly = this.orders_bymonthly.reduce((total, order) => total + order.total_order_price, 0);
  }
  SearchDaily(selectedDate:Date) {

    this.date = formatDate(selectedDate,'yyyy-MM-dd', 'en-US');
    this.orderService.getDailyReport(this.date).subscribe((data:any) => {
      this.orders_bydaily = data;
      console.log(this.date);
      console.log(this.orders_bydaily);
      this.calDaily();

     });
     
  }
 
  SearchMonth(SelectedMonthly:Date) {
     let monthly =  formatDate(SelectedMonthly,'MM-yyyy', 'en-US')        
    this.orderService.getMonthReport(monthly).subscribe((data:any) => {
      this.orders_bymonthly = data;
      console.log(this.orders_bymonthly);
      
      this.calMonthly();
    });
  }
}
