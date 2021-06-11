// import { Component} from '@angular/core';
// import { NgForm } from '@angular/forms';
// import {  Router } from '@angular/router';
// //import { RegistrationService } from '../registration.service';
// import { User } from '../user';
// // import { error } from 'console';

import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication-service.service';
import { LoginService } from '../login.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = new User();
  msg = '';
  massage = 'You entered invalid field';

  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    public AuthenticationService: AuthenticationService,
    private _router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.AuthenticationService.login(
      this.loginService.selectedUser.userName,
      this.loginService.selectedUser.password
    ).subscribe(
      (res) => {
        console.log(res);
        this.showSucessMessage = true;
        // setTimeout(() => (this.showSucessMessage = false), 4000);
        // this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages =
            'Something went wrong.Please contact admin.';
          console.log(err);
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.loginService.selectedUser = {
      userName: '',
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
