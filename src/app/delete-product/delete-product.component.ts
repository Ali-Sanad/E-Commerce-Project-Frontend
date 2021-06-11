import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
  providers: [ProductService]
})
export class DeleteProductComponent implements OnInit {

 // user : any = "admin";

  //product_id =0;
  constructor(public _ProductService : ProductService, private route : ActivatedRoute) {

  }

  ngOnInit(): void {

    //to catch the ID
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = (routeParams.get('_id'));
    console.log(productIdFromRoute);
      this._ProductService.deleteProduct(productIdFromRoute).subscribe(deletedData => {
        console.log("Product has been deleted !");
      })
  }

}
