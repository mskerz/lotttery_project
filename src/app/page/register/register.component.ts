import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Convert as memberCovert,Member } from 'src/app/model/member.model';
import { AuthService } from 'src/app/service/auth.service';
  



 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent {
 
  members = Array<Member>();
   
  hide = true;
  response:any;
  //field register
  
    email :string= 'a';
    password  :string= 'b';
    fullname :string='c';
    birthdate :string='d';
    phone_no :string='f';
  
  

  constructor(private auth:AuthService,private http:HttpClient) {
     
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
    console.log(JSON_Object);
    

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

            
          });
        }
      });
    } else {
      // หากไม่ได้ป้อนข้อมูลให้แสดงข้อความ
      console.log('คุณยังไม่ได้กรอกข้อมูลในบางช่อง!');
    }
  }
  
  
}
