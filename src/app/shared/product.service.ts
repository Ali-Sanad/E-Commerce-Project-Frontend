import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProduct: Product = {
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    country: '',
    image: '',
  };

  constructor(private http: HttpClient) {}
  //  baseurl: string = "https://chocolate-store-api.herokuapp.com/";
  baseurl: string = 'https://chocolate-store-api.herokuapp.com/';

  addProduct(product: Product) {
    const body = new FormData();
    const headers = {};

    Object.keys(product).forEach((key) => {
      body.append(`${key}`, product[key]);
    });

    console.log(body);
    console.log(product);
    return this.http.post(this.baseurl + 'api/product', body, {
      headers: headers,
    });
    // return this.http.post(this.baseurl + 'api/product', product, this.httpOptions );
  }
  updateProduct(id, data) {
    console.log(data);

    const reqBody = new FormData();
    Object.keys(data).map((key) => {
      reqBody.append(key, data[key]);
    });
    console.log(reqBody);
    return this.http.patch(
      `https://chocolate-store-api.herokuapp.com/api/product/${id}`,
      reqBody,
      {
        headers: {},
      }
    );
  }
  deleteProduct(id) {
    return this.http.delete(
      `https://chocolate-store-api.herokuapp.com/api/product/${id}`
    );
    // return this.http.delete(`https://chocolate-store-api.herokuapp.com/api/product/${id}`);
  }

  getProductDetail(id: any): any {
    return this.http.get(
      `https://chocolate-store-api.herokuapp.com/api/product/${id}`
    );
    // return this.http.get(`https://chocolate-store-api.herokuapp.com/api/product/${id}`);
  }

  updateComments(comment) {
    return this.http.post(
      `https://chocolate-store-api.herokuapp.com/api/product/comments`,
      comment
    );
  }
  getComments(id) {
    const body = { id };
    return this.http.get(
      `https://chocolate-store-api.herokuapp.com/api/product/comments`
    );
  }
}
