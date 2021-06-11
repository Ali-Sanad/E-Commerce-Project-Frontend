import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
// import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  public userInfo;

  constructor(private http: HttpClient, private router: Router) {
    //initialize current user with localstorage value if existed
    this.currentUserSubject = new BehaviorSubject<string>(
      localStorage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();

    console.log(localStorage);
  }

  public get currentUserValue() {
    //decryption
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.currentUserSubject.value);
    console.log(decodedToken);
    return decodedToken;
  }
  public get token() {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    return this.http
      .post<any>(`https://chocolate-store-api.herokuapp.com/api/user/login`, {
        userName,
        password,
      })
      .pipe(
        map((res) => {
          // login successful if there's a jwt token in the response

          const token = res.token;
          this.userInfo = res.user;
          // const helper = new JwtHelperService();

          // const decodedToken = helper.decodeToken(token);
          // console.log(decodedToken);

          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', token);
            // Object.assign(environment ,user) ;

            // console.log(this.currentUserSubject.next) ;
            // console.log (localStorage)
            this.currentUserSubject.next(token);
            this.router.navigate(['/collection']);
          }

          return token;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    console.log(localStorage);
    this.currentUserSubject.next(null);
    this.userInfo = null;
    this.router.navigate(['/login']);
  }
}

// import { Injectable } from '@angular/core';
// import { User} from './user';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   selectedUser : User = {
//  userName:"",
//  password:"",
//  email :"",
//  gender: "",
//  firstName :"",
//  lastName :"",
//  age :0,
//  phoneNumber :0,
//  address: "",
//  file :  "",
//    }

//  baseURL: string = "http://localhost:3000/api/user/";

//   constructor( private _http :HttpClient) { }

//   loginUser(user: User): Observable<any> {

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };
//       console.log(user)

//       const body = user
//       console.log(body)
//      return this._http.post(this.baseURL+'login', body, httpOptions )
//     }
// }
