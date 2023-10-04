import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Convert as memberCovert,Member } from 'src/app/model/member.model';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { MyErrorStateMatcher as ErrorMatcher } from '../login/login.component';  



 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email_matcher = new ErrorMatcher();
  members = Array<Member>();
  Current_member: any;
  hide = true;
  response:any;
  //field register
  
    email :string= '';
    password  :string= '';
    fullname :string='';
    birthdate :string='';
    phone_no :string='';

    
  

  constructor(private auth:AuthService,private http:HttpClient,private router:Router,private title:Title,private snackbar:MatSnackBar) {
     
  } 
  ngOnInit() {
    this.title.setTitle('สมัครสมาชิก');
  }

  onRegister() {
    // ตรวจสอบว่าข้อมูลที่จำเป็นถูกป้อนหรือไม่
    let JSON_Object = {
      email : this.email,
      password  : this.password,
      fullname :this.fullname,
      birthdate :this.birthdate,
      phone_no :this.phone_no
    }
    // console.log(JSON_Object);
    

    let json_string = JSON.stringify(JSON_Object);
    console.log(json_string);
    
    let IsNotEmpty = this.email && this.password && this.fullname && this.birthdate && this.phone_no;
     if (  IsNotEmpty) {
      // ดึงข้อมูลอีเมลจาก API
      this.auth.getMember().subscribe((data) => {
        // แปลงข้อมูล JSON ที่ได้มาเป็นออบเจ็กต์
        this.members = memberCovert.toMembers(JSON.stringify(data));
        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        const isEmailDuplicate = this.members.some(member => member.email === this.email);
        
        if (isEmailDuplicate) {
          Swal.fire({
            title: 'แจ้งเตือน',
            text: 'อีเมล์นี้มีผู้ใช้งานแล้ว',
            timer:2000,
          })
        } else {
          // ถ้าไม่ซ้ำให้ทำการลงทะเบียน
          this.http.post(this.auth.api_endpoint + "/member/register", json_string ,{observe:'response'}).subscribe((res) => {
            // ดำเนินการหลังจากการลงทะเบียนเสร็จสิ้น
            
            console.log(res.status);
            console.log(res.body);
            console.log("Register Successfully!");
            this.auth.OnLogin(this.email, this.password).subscribe((response:any) => {
              // ดำเนินการหลังจากเข้าสู่ระบบสำเร็จ
              console.log('เข้าสู่ระบบสำเร็จ', response);
              console.log('User ID:', response.user_id);
            
              if(response.roles=="admin"){
                setTimeout(() => {
                  this.router.navigate(['/admin/lottery']);
                }, 2000);
              }else{
                setTimeout(() => {
                  this.router.navigate(['/member/lottery']);
                }, 2000);
              }
              localStorage.setItem('currentUser', JSON.stringify(response));
             
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
             
            // localStorage.setItem('currentUser', JSON.stringify(JSON_Object));
            // console.log("Success");
             

            
          });
        }
      });
    } else {
      // หากไม่ได้ป้อนข้อมูลให้แสดงข้อความ
      console.log('คุณยังไม่ได้กรอกข้อมูลในบางช่อง!');
    }
  }
  
  
}
