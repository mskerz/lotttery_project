import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Lottery } from 'src/app/model/lottery.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  lotteries  = this.cartService.getCart();
  total = 0;
 constructor(private message:MatDialogRef<CartComponent>,private cartService:CartService){}
 
ngOnInit(){
  this.calculateTotal();
}

close(){
  this.message.close()
}
 
 
incrementQ(item:Lottery){
  item.lottery_quantity++;
  this.calculateTotal();
}
decrementQ(item:Lottery){
  if (item.lottery_quantity > 0) {
    item.lottery_quantity--;
    this.calculateTotal();
  }
  if (item.lottery_quantity === 0) {
    this.cartService.RemoveItemFromCart(item);
     
  }
}
calculateTotal() {
  this.total = 0; // รีเซ็ตค่าราคารวมเป็น 0 ก่อนคำนวณใหม่
  for (const lottery of this.lotteries) {
    this.total += lottery.price * lottery.lottery_quantity;
  }
}


CancelOrder(){
  
  this.cartService.ResetCart();
  this.lotteries = this.cartService.getCart();
  this.calculateTotal();
}

}
