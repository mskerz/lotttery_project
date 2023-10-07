import { Component, OnInit } from '@angular/core';

import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email_matcher = new MyErrorStateMatcher();
  
 
  hide = true;
  email:string = '';
  password:string = '';
  user:any;
  isLoggedIn :boolean = false;
  remember =false;

  constructor(private auth:AuthService, private route :Router,private title:Title,private snackbar:MatSnackBar){
      
  }
  ngOnInit(): void {
    this.title.setTitle('เข้าสู่ระบบ');
    const rememberdata = localStorage.getItem('rememberLogin');
    if(rememberdata){
      const login_data = JSON.parse(rememberdata);
      this.email = login_data.email;
      this.password = login_data.password;
      this.remember =true;
    }
    const user_current = localStorage.getItem('currentUser');
    if(user_current){
      this.isLoggedIn=true;
      this.user = JSON.parse(user_current)
      if(this.user.roles =="admin"){

        this.route.navigate(['/admin']);
      }else if(this.user.roles =="member"){
        this.route.navigate(['/member']);
      }
    }else{
      this.isLoggedIn=false;
      
    }
  }
   login() {
    if(this.email&&this.password){
      this.auth.OnLogin(this.email, this.password).subscribe((response:any) => {
          // ดำเนินการหลังจากเข้าสู่ระบบสำเร็จ
          console.log('เข้าสู่ระบบสำเร็จ', response);
          console.log('User ID:', response.user_id);
          this.isLoggedIn = true;
          if(response.roles=="admin"){
            setTimeout(() => {
              this.route.navigate(['/admin/dashboard']);
            }, 2000);
          }else{
            setTimeout(() => {
              this.route.navigate(['/member/lottery']);
            }, 2000);
          }
          localStorage.setItem('currentUser', JSON.stringify(response));
          if(this.remember){
            const login = {
              email: this.email,
              password:this.password
            };
            localStorage.setItem('rememberLogin',JSON.stringify(login));
          }else{
            localStorage.removeItem('rememberLogin');
          }
          // คุณสามารถนำผลลัพธ์ไปทำอย่างอื่น ๆ ที่คุณต้องการที่นี่
        },
        (error) => {
          // จัดการข้อผิดพลาดเมื่อเข้าสู่ระบบไม่สำเร็จ
          console.error('เข้าสู่ระบบล้มเหลว', error);
           // กำหนดข้อความข้อผิดพลาด
          this.snackbar.open('เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบอีเมลและรหัสผ่านของคุณ', 'ปิด', {
            duration: 5000, // ระยะเวลาที่ Snackbar แสดง (5 วินาที)
        });
          
        }
    );
    }else{
      this.snackbar.open('กรุณาใส่อีเมล หรือ รหัสผ่าน', 'ปิด', {
        duration: 5000, // ระยะเวลาที่ Snackbar แสดง (5 วินาที)
    });
    }
    
  }
  
}
