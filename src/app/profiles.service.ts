import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { URL } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private _http: HttpClient) {}
  public getUserInfo(id, role): Observable<any> {
    // const body = {

    // }
    if (role == 0) {
      return this._http.get<any>(
        `https://chocolate-store-api.herokuapp.com/user/userprofile`
      );
    }
    return this._http.get<any>(
      `https://chocolate-store-api.herokuapp.com/user/adminDashBoard`
    );
  }
  public updatedProfile(newProfile, fakePassword): Observable<any> {
    const reqBody = new FormData();

    if (newProfile.password == fakePassword) {
      delete newProfile['password'];
    }

    console.log(newProfile);
    Object.keys(newProfile).map((key) => {
      reqBody.append(key, newProfile[key]);
    });

    return this._http.patch(`${URL.apiUrl}/user/profile`, reqBody, {
      headers: {},
    });
  }
}

// https://chocolate-store-api.herokuapp.com/api/product
// const header = {"Content-Type" : "application/json" , "Authorization" : localStorage.getItem('token')}
// return this.http.post( `https://chocolate-store-api.herokuapp.com/order`, myorder , {'headers':header} );
