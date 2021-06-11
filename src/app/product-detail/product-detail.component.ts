import { Component, OnInit } from '@angular/core';
import{ProductService}from "../shared/product.service"
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../authentication-service.service"
//import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

})
export class ProductDetailComponent implements OnInit {
  user : any = "admin";
  commentText="";

  products :any ;
   constructor(private route : ActivatedRoute, private _ProductdetailsService: ProductService,private AuthenticationService:AuthenticationService ){}

  //  addToCart(product) {
  //   this.cartService.addToCart(product);
  //   window.alert('Your product has been added to the cart!');
  // }
  ngOnInit(): void {

  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = (routeParams.get('_id'));
    console.log(productIdFromRoute);
    this._ProductdetailsService.getProductDetail(productIdFromRoute).subscribe(res => {
        console.log(res);
        this.products = res;
      });
  }

  comment(){
    const productIdFromRoute = (this.route.snapshot.paramMap.get('_id'));
    const {image,name}=this.AuthenticationService.userInfo ; 
    const text = this.commentText ; 

    const comment = {
      id:productIdFromRoute , 
      image,name,text
    }
    this._ProductdetailsService.updateComments(comment).subscribe((res)=>{
      console.log(res);
    }) ;
  }


}
