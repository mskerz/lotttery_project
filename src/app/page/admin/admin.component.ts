import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  user:any ;
  isLoggedIn = false;
  constructor(private router: Router,private auth : AuthService){
    const user_current = localStorage.getItem('currentUser');
    if(user_current){
      this.user = JSON.parse(user_current);
      this.isLoggedIn = true;
      if(this.user.roles=="member"){
        this.router.navigate(['/member']);
      }
    }else {
      // หากไม่มีข้อมูลผู้ใช้ใน localStorage หรือผู้ใช้ไม่ได้เข้าสู่ระบบ ให้นำไปยังหน้า login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
  formatDate(date: string){
    return this.auth.formatBirthdate(date);
  }
}
