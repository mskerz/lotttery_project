import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  api_endpoint:string = 'http://localhost:80/api_lottery'
  
  loginEvent: EventEmitter<{ isLoggedIn: boolean, user: any }> = new EventEmitter<{ isLoggedIn: boolean, user: any }>();
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  user:any ;
   
  constructor(private http:HttpClient) { 
     
  }
  ngOnInit()  {
    const current_user = localStorage.getItem('currentUser');
    if(current_user){
      this.user = JSON.parse(current_user);
    }
  }

   
  

  


  OnLogin(email:string, password:string){
    this.loginEvent.emit({ isLoggedIn: true, user: this.user });
    return this.http.post(this.api_endpoint+"/member/login",{email,password});
  }
  getMember(){
    return this.http.get(this.api_endpoint+"/members");
  }
  Logout(){
    this.logoutEvent.emit();
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
