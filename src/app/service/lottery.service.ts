import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lottery } from '../model/lottery.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  api_endpoint:string = 'https://lotteryg112566.bowlab.net/api_lottery'
  
  cart:Lottery[]=[];
  response:any;
  lotteries:any;
  private lotteryUpdateSubject = new Subject<void>();
  public lotteryUpdated = this.lotteryUpdateSubject.asObservable();
  constructor(private http:HttpClient) { }

  lottery_insert(data:any){
    return this.http.post(this.api_endpoint+"/lottery/insert",data,{observe:"response"})
  }
 
  GetLottery(){
    
    return this.http.get<any[]>(this.api_endpoint+"/lotteries");
  }
  
  getLotteryFromKeyword(keyword:string,vaule:string){
    return this.http.get<any[]>(this.api_endpoint+"/lottery/"+keyword+"/"+vaule);
  }
  SearchBylast3digit(last3digit: string){
    

  }
  SearchByDrawNumber(draw_no:number){


  }
  SearchBySetNumber(set_no:number){

   }

  

  delete(idx: number){
    return this.http.delete(this.api_endpoint+"/lottery/delete/"+idx);
  }
}
