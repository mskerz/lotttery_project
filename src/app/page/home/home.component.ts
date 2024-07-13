import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  constructor(private title:Title){}
  user:any;
  isLoggedIn=false;
  IsAdmin=false;
  ngOnInit(): void {
    this.title.setTitle("หน้าแรก")
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ใน localStorage หรือไม่
    const current_user = sessionStorage.getItem('currentUser');
    
    if (current_user) {
      
      this.user = JSON.parse(current_user);
      this.isLoggedIn = true;
      
       
      if(this.user.roles=="admin"){
        this.IsAdmin = true;
      }
    
  }
}
}
