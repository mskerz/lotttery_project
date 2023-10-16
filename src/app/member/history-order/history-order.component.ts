import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router'
import { Table } from 'primeng/table';
import { HistoryOrderUser as HistoryOrder,Convert as History_Convert } from 'src/app/model/historyorder.model';
import { DetailPurchaseComponent } from '../detailpurchase/detailpurchase.component';
import { MatDialog } from '@angular/material/dialog';
 
@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
 history_orders = Array<HistoryOrder>();
  user_id:number=0;
    
  searchQuery: string = ''; // Filter by lottery number
  searchDate: string = '';
 constructor(private orderService:OrderService,private route:ActivatedRoute,private dialog:MatDialog){}

 ngOnInit() {
    

     this.route.params.subscribe(params=>{
      this.user_id = params['user_id'];
       this.fetch();
      })
     
 }
 fetch(){
    this.orderService.getHistory(this.user_id).subscribe((data) => {
        this.history_orders = History_Convert.toHistoryOrderUser(JSON.stringify(data));
         console.log(typeof this.history_orders);
         
    });
 }
 
 clear() {
  this.searchQuery='';
  this.searchDate = '';
  this.fetch();
  }

  openDetails(SelectedOrder:any) {
     this.orderService.order = SelectedOrder;
     this.dialog.open(DetailPurchaseComponent,{
      minWidth:'300px',
    });
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
