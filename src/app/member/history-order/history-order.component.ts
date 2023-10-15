import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router'
import { Table } from 'primeng/table';
 
@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
 history_orders = Array<any>();
  user_id:number=0;
    
  searchQuery: string = ''; // Filter by lottery number
  searchDate: string = '';
 constructor(private orderService:OrderService,private route:ActivatedRoute){}

 ngOnInit() {
    

     this.route.params.subscribe(params=>{
      this.user_id = params['user_id'];
       this.fetch();
      })
     
 }
 fetch(){
    this.orderService.getHistory(this.user_id).subscribe((data) => {
        this.history_orders = data.map((item)=>{
          return{
            purchase_date: item.purchase_date,
            fullname: item.fullname,
            lottery_number: item.lottery_number.toString().padStart(6, '0'), // เติม 0 นำหน้าถ้ามีน้อยกว่า 6 หลัก
            quantity_order: item.quantity_order,
            price: item.price,
            total_price: item.total_price
          };
        //   {
        //     purchase_date: item.purchase_date,
        //    "fullname": "Fairy Dragonic",
        //    "lottery_number": 743833,
        //    "quantity_order": 3,
        //    "price": 85,
        //    "total_price": 255
        //  }
        });
         
    });
 }
 
 clear() {
  this.searchQuery='';
  this.searchDate = '';
  this.fetch();
  }
applyFilters() {
  // Filter by lottery number
  if (this.searchQuery) {
    this.history_orders = this.history_orders.filter(order => {
      return order.lottery_number.toString().includes(this.searchQuery);
    });
  }else if (this.searchDate=='') {
    this.fetch();
  }

  // Filter by purchase date (assuming purchase_date is in 'yyyy-MM-dd' format)
  if (this.searchDate) {
    this.history_orders = this.history_orders.filter(order => {
      return order.purchase_date.includes(this.searchDate);
    });
  }
}

}
