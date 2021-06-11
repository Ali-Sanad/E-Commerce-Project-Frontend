import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  changeOrderStatus(id, status) {
    const body = { status };
    return this.http.patch(
      `https://chocolate-store-api.herokuapp.com/api/order/${id}`,
      body
    );
  }
  getAllOrders() {
    return this.http.get(
      `https://chocolate-store-api.herokuapp.com/api/order/`
    );
  }
  getMyOrders() {
    return this.http.get(
      `https://chocolate-store-api.herokuapp.com/api/order/myOrder`
    );
  }
}
