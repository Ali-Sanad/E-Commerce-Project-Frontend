import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  selectedUser = {
    userName: '',
    password: '',
  };

  baseURL: string = 'https://chocolate-store-api.herokuapp.com/api/user/';

  constructor() {}
}
