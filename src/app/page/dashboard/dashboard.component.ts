import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarVisible1  = false;
  order =Array<any>();
  orderDetailsVisible: { [order_id: string]: boolean } = {}; // ตัวแปรเก็บสถานะการแสดงรายละเอียด

  constructor(private orderService:OrderService){}

  ngOnInit() {
      this.orderService.getAllOrders().subscribe((data:any) => {
        this.order = data;
      });
  }
  toggleOrderDetails(order_id: string) {
    this.orderDetailsVisible[order_id] = !this.orderDetailsVisible[order_id];
  }
}
