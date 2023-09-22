import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  api_endpoint:string = 'http://localhost/api_lottery'
  constructor(private http:HttpClient) { }

  getLotteryFromLast3digit(last3digit:string){
     return this.http.get(this.api_endpoint+"/lottery/"+last3digit);
  }
}
