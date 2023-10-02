import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Convert as memberCovert,Member } from 'src/app/model/member.model';
import { AuthService } from 'src/app/service/auth.service';
  



 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent implements OnInit {
 
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

    
  

  constructor(private auth:AuthService,private http:HttpClient,private router:Router,private title:Title) {
     
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
      this.auth.getEmail(this.email).subscribe((data) => {
        // แปลงข้อมูล JSON ที่ได้มาเป็นออบเจ็กต์
        this.members = memberCovert.toMembers(JSON.stringify(data));
        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        const isEmailDuplicate = this.members.some(member => member.email === this.email);
        
        if (isEmailDuplicate) {
          console.log(" this email is duplicated");
        } else {
          // ถ้าไม่ซ้ำให้ทำการลงทะเบียน
          this.http.post(this.auth.api_endpoint + "/member/register", json_string ,{observe:'response'}).subscribe((res) => {
            // ดำเนินการหลังจากการลงทะเบียนเสร็จสิ้น
            
            console.log(res.status);
            console.log(res.body);
            console.log("Register Successfully!");
            console.log("ทดลองเรียกข้อมูลจากemail มาเก็บใน localstorage");
            this.http.get(this.auth.api_endpoint+"/member/"+this.email).subscribe((data:any) => {
                console.log(data.user_id);
              //set storage
               let user_current = {
                user_id : data.user_id,
                email: this.email,
                fullname:this.fullname,
                birthdate :this.birthdate,
                phone_no :this.phone_no
              }
              localStorage.setItem('currentUser', JSON.stringify(user_current));
               
           });
             
            // localStorage.setItem('currentUser', JSON.stringify(JSON_Object));
            // console.log("Success");
            this.router.navigate(['/member']);
            

            
          });
        }
      });
    } else {
      // หากไม่ได้ป้อนข้อมูลให้แสดงข้อความ
      console.log('คุณยังไม่ได้กรอกข้อมูลในบางช่อง!');
    }
  }
  
  
}
