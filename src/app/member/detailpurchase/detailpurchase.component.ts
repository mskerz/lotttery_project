import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HistoryOrderUser as HistoryOrder } from 'src/app/model/historyorder.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-detailpurchase',
  templateUrl: './detailpurchase.component.html',
  styleUrls: ['./detailpurchase.component.scss']
})
export class DetailPurchaseComponent implements OnInit {
  SelectedOrder:HistoryOrder;
  user:any;
  constructor(private orderService:OrderService,private dialog:MatDialogRef<DetailPurchaseComponent>){
    this.SelectedOrder = this.orderService.order;
    console.log(this.SelectedOrder);
    
   }
  ngOnInit(): void {
    const user_current = localStorage.getItem('currentUser');
    if(user_current){
      this.user = JSON.parse(user_current);
    }
   }
  

  close(){
    this.dialog.close();
  }

}
