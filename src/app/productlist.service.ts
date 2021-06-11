import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ProductlistService {
  //   constructor() {}

  //   getProduct () {
  //     return [{id : 1, price : "$24.99", title: "Dark Chocolate Collection 15 Pieces"},
  //     {id : 3, price : "$24.99", title: "Dark Chocolate Collection 15 Pieces"},
  //     {id : 5, price : "$24.99", title: "Dark Chocolate Collection 15 Pieces"},
  //     {id : 5, price : "$24.99", title: "Dark Chocolate Collection 15 Pieces"}

  // ];}
  constructor(private http: HttpClient) {}
  getProduct() {
    //  return this.http.get(`https://chocolate-store-api.herokuapp.com/api/product`);

    return this.http.get(
      `https://chocolate-store-api.herokuapp.com/api/product`
    );
  }
}
