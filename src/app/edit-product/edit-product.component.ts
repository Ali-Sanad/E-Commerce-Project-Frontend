import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService],
})
export class EditProductComponent implements OnInit {
  user: any = 'admin';

  showSucessMessage: boolean;
  serverErrorMessages: string;

  product;
  constructor(
    public _ProductService: ProductService,
    private route: ActivatedRoute
  ) {
    // this.product={...this._ProductService.selectedProduct}
  }

  routeParams = this.route.snapshot.paramMap;
  productIdFromRoute = this.routeParams.get('_id');
  onSubmit() {
    // console.log(form.value)
    this._ProductService
      .updateProduct(this.productIdFromRoute, this.product)
      .subscribe(
        (res) => {
          console.log(res, 'data updated');

          this.showSucessMessage = true;
          // setTimeout(() => (this.showSucessMessage = false), 3000);
          //    this.resetForm(form);
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else {
            console.log(err);
            this.serverErrorMessages =
              'Something went wrong.Please contact admin.';
          }
        }
      );
  }

  reset(image) {
    this.product = { ...this._ProductService.selectedProduct };
    console.log(this.product, this._ProductService.selectedProduct);
    // form.resetForm();
    console.log(this.product.image);
    image.src = `https://chocolate-store-api.herokuapp.com/uploads/productImages/${this.product.image}`;
    this.serverErrorMessages = '';
    delete this.product.file;
  }

  photo;
  fd: FormData;
  done(t) {
    t.click();
  }

  change(e, t2) {
    if (e.target.files.length > 0) {
      //as File =important
      let file = e.target.files[0];
      console.log(file);
      file = file as File;
      console.log(file);
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        let content = readerEvent.target.result;
        this.product.file = file;
        t2.src = content;
        console.log(this.product);
      };
    }
  }

  //end of photo

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('_id');
    console.log(productIdFromRoute);
    this._ProductService
      .getProductDetail(productIdFromRoute)
      .subscribe((res) => {
        console.log(res);
        this._ProductService.selectedProduct = { ...res };
        this.product = { ...res };
      });
  }
}
