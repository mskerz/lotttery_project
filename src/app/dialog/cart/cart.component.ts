import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Lottery } from 'src/app/model/lottery.model';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  lotteries  = this.cartService.getCart();
  total = 0;
  user:any;
 constructor(private message:MatDialogRef<CartComponent>,private cartService:CartService,private order:OrderService){}
 
ngOnInit(){
  const this_user = localStorage.getItem('currentUser');
  if(this_user){
    this.user = JSON.parse(this_user);
  }
  this.calculateTotal();
}

close(){
  this.message.close()
}
async confirmOrder() {
  const confirmation = await Swal.fire({
    title: 'ยืนยันการสั่งซื้อ',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก'
  });

  if (confirmation.isConfirmed) {
    this.SaveOrder();
  }
}
 
SaveOrder(){
  const OrderData = {
    user_id: this.user.user_id,
    lottery_details: this.lotteries.map((lottery) =>({
      lottery_idx: lottery.idx,
      quantity_order: lottery.lottery_quantity
    }))
  };
  console.log(OrderData);
  this.order.Order(OrderData).subscribe(
    (response) => {
      Swal.fire('สั่งซื้อเสร็จสิ้น', 'คำสั่งซื้อของคุณถูกส่งแล้ว', 'success');
      this.cartService.ResetCart();
      this.lotteries = this.cartService.getCart();
      this.calculateTotal();
    },
    (error) => {
      Swal.fire('เกิดข้อผิดพลาด', 'มีข้อผิดพลาดในการสั่งซื้อ', 'error');
    }
  );
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
removeItem(item:Lottery){
  Swal.fire({
    title: 'จะลบสลากนี้ออกจากตะกร้า ?',
    showConfirmButton:true,
    confirmButtonColor:'red',
    confirmButtonText:'ลบ',
    showCancelButton:true,
    
   }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire('ลบออกจากตะกร้าเรียบร้อย!', '', 'success')
        this.cartService.RemoveItemFromCart(item);
        this.calculateTotal();
      }
   })
  
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
