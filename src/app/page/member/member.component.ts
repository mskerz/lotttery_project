import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Member } from 'src/app/model/member.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
   
  random = '';
  zero = '0 อยู่ข้างหน้า';
  user:any ;
  isLoggedIn = false;
  constructor(private router: Router,private auth: AuthService,private title:Title){
    
    const user_current = localStorage.getItem('currentUser');
    if(user_current){
      this.user = JSON.parse(user_current);
      this.isLoggedIn = true;
      if(this.user.roles=="admin"){
        this.router.navigate(['/admin']);
      }else{
         this.router.navigate(['/member']);
      }

    }else {
      // หากไม่มีข้อมูลผู้ใช้ใน localStorage หรือผู้ใช้ไม่ได้เข้าสู่ระบบ ให้นำไปยังหน้า login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
    
  }
  ngOnInit(){
    this.title.setTitle('Member Profile');
  }

  formatDate(date: string){
    return this.auth.formatBirthdate(date);
  }
  
  generateNumber(){
    this.random =Math.floor((Math.random()*1000000)+1).toString();
    if(this.random.charAt(0)=='0'){
       console.log(this.zero)
    }
  }

}
