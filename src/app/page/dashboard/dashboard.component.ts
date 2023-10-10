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
  orderDetailsVisible: { [order_id: string]: boolean } = {}; // ตัวแปรเก็บสถานะการแสดงรายละเอียด

  constructor(private orderService:OrderService,private auth:AuthService){
   }

  ngOnInit() {
     this.FetchReport();
  }
  FetchReport(){
    this.orderService.getAllOrders("daily").subscribe((data:any) => {
      this.orders_bydaily = data;
    });
    this.orderService.getAllOrders("monthly").subscribe((data:any) => {
      this.orders_bymonthly = data;
    });
  }
  toggleOrderDetails(order_id: string) {
    this.orderDetailsVisible[order_id] = !this.orderDetailsVisible[order_id];
  }
}
