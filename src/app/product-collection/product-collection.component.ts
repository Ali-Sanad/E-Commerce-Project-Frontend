import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../productlist.service';
import { CartService } from '../cart.service';
// import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-collection',
  templateUrl: './product-collection.component.html',
  styleUrls: ['./product-collection.component.css'],
})
export class ProductCollectionComponent implements OnInit {
  user: any;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private _productService: ProductlistService,
    AuthenticationService: AuthenticationService
  ) {
    if (AuthenticationService.currentUserValue) {
      this.user =
        AuthenticationService.currentUserValue.role == 1 ? 'admin' : 'customer';
      console.log(this.user);
    }
  }

  // S E A R C H
  onKey(event) {
    const productName = event.target.value;
    if (productName !== '') {
      this.http
        .get(
          `https://chocolate-store-api.herokuapp.com/api/product/search/${productName}`
        )
        .subscribe((data) => {
          // console.log(data)
          this.products = [...data['filteredProducts']];
        });
    } else {
      this.http
        .get(`https://chocolate-store-api.herokuapp.com/api/product`)
        .subscribe((data) => {
          this.products = data;
        });
    }
  }

  items: any;

  addtocart(_id) {
    let product = {
      productId: _id,
    };
    // product.productId = _id;
    // console.log(_id)
    console.log(this.cartService.addToCart(product));
  }
  subtract(_id) {
    let product = {
      productId: _id,
    };
    product.productId = _id;
    console.log(this.cartService.subtractFromCart(product));
  }
  checkout() {
    return this.cartService
      .checkout(JSON.parse(localStorage.getItem('cart')))
      .subscribe((data) => console.log(data));
  }

  getItem() {
    this.items = this.cartService.getItems();
  }

  products: any;
  // constructor(private _productService : ProductlistService) {}
  profile = {};

  loadUser() {
    this._productService.getProduct().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  ngOnInit() {
    this.loadUser();
  }
}
