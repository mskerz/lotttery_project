import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost/api_lottery'; // ระบุ URL ของ API ของคุณ
  response:any ;
  constructor(private http: HttpClient) { }

  Order(data: any) {
    return this.http.post(`${this.apiUrl}/lottery/order`,data,{observe:'response'});
  }

  getAllOrders(report_type: string) {
    return this.http.get(`${this.apiUrl}/lotteries/admin/report_order?report_type=${report_type}`);
  }
  getHistoryOrder(user_id: number){
    return   this.http.get(`${this.apiUrl}/member/history_orders/${user_id}`);
  }
  getHistory(user_id: number){
    return   this.http.get(`${this.apiUrl}/history/${user_id}`);
  }
}
