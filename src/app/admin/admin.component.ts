import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../productlist.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private _productService: ProductlistService ) { }

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
