import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  selectedUser: User = {
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

  baseURL: string = 'https://chocolate-store-api.herokuapp.com/api/user/';

  constructor(private _http: HttpClient) {}

  postUser(user: User): Observable<any> {
    const headers = {
      // Accept: 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'multipart/form-data',
      // enctype:"multipart/form-data",
      // Boundary:"---WebKitFormBoundary7MA4YWxkTrZu0gW"
    };

    const body = new FormData();

    Object.keys(user).forEach((key) => {
      body.append(`${key}`, user[key]);
    });

    console.log(body);
    return this._http.post(this.baseURL + 'signUp', body, { headers: headers });
  }
}
