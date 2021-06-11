import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import { NgForm} from '@angular/forms'


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers:[ProductService]
})
export class AddProductComponent implements OnInit {

  user : any = "admin";

  showSucessMessage: boolean;
  serverErrorMessages: string;

  products :any ;
   constructor(public _ProductService : ProductService){}

  onSubmit(form: NgForm) {
    this._ProductService.addProduct(this._ProductService.selectedProduct).subscribe(
      res => {
        console.log(res);
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else{
          console.log(err);
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';

        }
      }
    );
  }

  resetForm(form: NgForm) {
    this._ProductService.selectedProduct = {
      name:'',
      category:'',
      description: '',
      price: 0,
      quantity:0,
      country: '',
     image:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  //photo
  // fd:FormData;
   done(t) {
     t.click();
   }

  change(e, t2) {

    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = readerEvent => {
      this._ProductService.selectedProduct.image = file;
      let content = readerEvent.target.result;
      t2.src = content;
    };

  }
  //end of photo

  ngOnInit(): void {
  }



}


