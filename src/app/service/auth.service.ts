import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_endpoint:string = 'http://localhost:80/api_lottery'
   
  members :any;
  constructor(private http:HttpClient) { }

  OnLogin(email:string, password:string){
    return this.http.post(this.api_endpoint+"/member/login",{email,password});
  }
  getEmail(email:string){
    return this.http.get(this.api_endpoint+"/members");
  }
   
}
