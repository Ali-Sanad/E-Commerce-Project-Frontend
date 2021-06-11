import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService],
})
export class RegistrationComponent implements OnInit {
  msg = '';
  massage = 'You entered invalid field';

  //gender
  gender = ['Male', 'Female'];
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    public registrationService: RegistrationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.registrationService
      .postUser(this.registrationService.selectedUser)
      .subscribe(
        (res) => {
          console.log(res);
          this.showSucessMessage = true;
          // setTimeout(() => (this.showSucessMessage = false), 4000);
          this._router.navigate(['/login']);
          this.resetForm(form);
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else
            this.serverErrorMessages =
              'Something went wrong.Please contact admin.';
        }
      );
  }

  resetForm(form: NgForm) {
    this.registrationService.selectedUser = {
      email: '',
      userName: '',
      password: '',
      gender: '',
      firstName: '',
      lastName: '',
      age: 0,
      phoneNumber: 0,
      address: '',
      file: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  //photo
  fd: FormData;
  done(image) {
    image.click();
  }
  // tslint:disable-next-line:typedef
  change(e, image2) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      let content = readerEvent.target.result;
      this.registrationService.selectedUser.file = file;
      console.log(this.registrationService.selectedUser.file);
      image2.src = content;
    };
  }
}
