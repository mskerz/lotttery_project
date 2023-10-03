import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lottery } from '../model/lottery.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  api_endpoint:string = 'http://localhost/api_lottery'
  
  cart:Lottery[]=[];
  response:any;

  private lotteryUpdateSubject = new Subject<void>();
  public lotteryUpdated = this.lotteryUpdateSubject.asObservable();
  constructor(private http:HttpClient) { }

  lottery_insert(data:any){
    return this.http.post(this.api_endpoint+"/lottery/insert",data,{observe:"response"})
  }
 
  GetLottery(){
    
    return this.http.get<any[]>(this.api_endpoint+"/lotteries");
  }
  SearchLottery(last3digit: string,draw_no: number,set_no: number){
    return this.http.get<any[]>(this.api_endpoint+"/lottery/search/"+last3digit+"/"+draw_no+"/"+set_no);
  }
}
