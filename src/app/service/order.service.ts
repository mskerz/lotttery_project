 import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost/api_lottery'; // ระบุ URL ของ API ของคุณ
  CurrentDate = new Date();
  response:any ;
  constructor(private http: HttpClient) { }

  Order(data: any) {
    return this.http.post(`${this.apiUrl}/lottery/order`,data,{observe:'response'});
  }

  getAllOrders(report_type: string) {
    return this.http.get(`${this.apiUrl}/lotteries/admin/report_order?report_type=${report_type}`);
  }
  Report(){

  }
  getMonthReport(month: string){
    if(month==''){
      return this.http.get<any[]>(`${this.apiUrl}/lotteries/admin/report_order?monthly=10/2023`);
    }
    return this.http.get<any[]>(`${this.apiUrl}/lotteries/admin/report_order?month=${month}`);
  }
  getDailyReport(day: string){
    if(day==''){
      day = formatDate(this.CurrentDate,'yyyy-MM-dd', 'en-US');
      return this.http.get<any[]>(`${this.apiUrl}/lotteries/admin/report_order?daily=${day}`);

    }
    return this.http.get<any[]>(`${this.apiUrl}/lotteries/admin/report_order?daily=${day}`);

  }
   
  getHistory(user_id: number){
    return   this.http.get<any[]>(`${this.apiUrl}/history/${user_id}`);
  }
  getDetailOrder(user_id: number){
    return this.http.get(this.apiUrl+"/last_order/"+user_id);
  }
}
