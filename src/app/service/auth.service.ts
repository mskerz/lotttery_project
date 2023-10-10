import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  api_endpoint:string = 'http://localhost:80/api_lottery'
  
  
  user:any ;
  isLoggedIn :boolean =false;
  isAdmin :boolean =false;
  constructor(private http:HttpClient) { 
     
  }
  ngOnInit()  {
    
  }

   
  IsLoggedIn():boolean {
     
    const current_user = localStorage.getItem('currentUser');
    if(current_user){
      this.user = JSON.parse(current_user);
      return true;
    }
    return false;
  }

  IsAdmin():boolean {
    let isadmin =false;
    if(this.user.roles =="admin"){
      isadmin = true;
    }else if(this.user.roles =="member"){
      isadmin = false;
    }
    return isadmin;
  }


  OnLogin(email:string, password:string){
    return this.http.post(this.api_endpoint+"/member/login",{email,password});
  }
  getMember(){
    return this.http.get(this.api_endpoint+"/members");
  }
  Logout(){
    localStorage.removeItem('currentUser');
  }

  formatBirthdate(birthdate: string): string {
    const parts = birthdate.split('-');
    const day = parseInt(parts[2], 10);
    const monthNames = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม'
    ];
    const month = monthNames[parseInt(parts[1], 10) - 1];
    const year = parseInt(parts[0], 10) + 543; // Convert to Thai year
    return `  ${day}  ${month} พ.ศ. ${year}`;
  }

  
}
