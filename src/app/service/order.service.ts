import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost/api_lottery'; // ระบุ URL ของ API ของคุณ

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(`${this.apiUrl}/lotteries/admin/report_order`);
  }
}
