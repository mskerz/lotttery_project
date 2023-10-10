import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router'
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';

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
 constructor(private orderService:OrderService,private route:ActivatedRoute,private title:Title){}

 ngOnInit() {
    this.title.setTitle('ประวัติการซื้อ')

     this.route.params.subscribe(params=>{
      this.user_id = params['user_id'];
       this.fetch();
      })
     
 }
 fetch(){
    this.orderService.getHistory(this.user_id).subscribe((data:any) => {
        this.history_orders = data;
         
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
  }

  // Filter by purchase date (assuming purchase_date is in 'yyyy-MM-dd' format)
  if (this.searchDate) {
    this.history_orders = this.history_orders.filter(order => {
      return order.purchase_date.includes(this.searchDate);
    });
  }
}

}
