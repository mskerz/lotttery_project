import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lottery } from '../model/lottery.model';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  api_endpoint:string = 'http://localhost/api_lottery'
  
  cart:Lottery[]=[];
  constructor(private http:HttpClient) { }

  getLotteryFromKeyword(keyword:string,vaule:string){
    return this.http.get(this.api_endpoint+"/lottery/"+keyword+"/"+vaule);
  }
  GetLottery(){
    return this.http.get<any[]>(this.api_endpoint+"/lotteries");
  }
}
