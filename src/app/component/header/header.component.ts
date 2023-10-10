import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from 'src/app/dialog/cart/cart.component';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Lotto Shop'
  isLoggedIn: boolean = false; // กำหนดตัวแปรเพื่อตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
  IsAdmin:boolean=false;
  user:any;
  cartItemCount: number = 0;

   
  constructor(private auth:AuthService,private cartDialog:MatDialog,private router :Router,private cartService: CartService){
    this.cartItemCount = this.cartService.getCart().length;
  }
  
  ngOnInit(): void {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ใน localStorage หรือไม่
    const current_user = localStorage.getItem('currentUser');

    if (current_user) {
      
      this.user = JSON.parse(current_user);
      this.isLoggedIn = true;
      
       
      if(this.user.roles=="admin"){
        this.IsAdmin = true;
      }
      this.cartItemCount = this.cartService.getCart().length;

    // Subscribe เพื่อรับการแจ้งเตือนเมื่อมีการเปลี่ยนแปลงในตะกร้า
      this.cartService.cartUpdated.subscribe(() => {
      this.cartItemCount = this.cartService.getCart().length;
    });
      // ถ้ามีข้อมูลผู้ใช้ ให้กำหนด isLoggedIn เป็น true
    }else{
      this.isLoggedIn =false;
    }
  }
   
  IsCartEmpty(): boolean {
    // ตรวจสอบว่าตะกร้าว่างเปล่าหรือไม่
    return this.cartItemCount === 0;
  }
  Logout(){
    this.isLoggedIn=false;
    this.auth.Logout();
    this.router.navigate(['/login']);
  }
  
  OpenCart(){
    this.cartDialog.open(CartComponent,{
      minWidth:'300px',
      disableClose:true,
    });
  }
  
}
