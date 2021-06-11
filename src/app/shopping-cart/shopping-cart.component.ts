import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: any;

  constructor(private cartService: CartService) {

    this.products =  this.cartService.getItems()
    console.log(this.products)
  }


  addtocart(_id,name,image) {
    let product = {
      productId: _id,
      name:name,
      image:image
    };
    this.products =[...this.cartService.addToCart(product)];

  }
  subtract(_id) {
    let product = {
      productId: _id,
    };
    // product.productId = _id;
    this.products = [...this.cartService.subtractFromCart(product)]
  }
  checkout() {
    if (JSON.parse(localStorage.getItem('cart')).length > 0) {
      return this.cartService
        .checkout(JSON.parse(localStorage.getItem('cart')))
        .subscribe(
          (data) => localStorage.removeItem('cart'),
          (err) => console.log(err)
        );
    } else {
      console.log('Your cart is empty you cant checkout');
    }
  }


  ngOnInit(): void {
    console.log(history)
    const{id,name,image}= history.state;
    this.addtocart(id,name,image);
  }

}
