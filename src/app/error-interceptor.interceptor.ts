


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService ,private router:Router ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          //check if the http method respond with Unauthorized or 403 Forbidden 
            if (err.status == 401 || err.status == 403 ) {
                //then log the user out = delete his token from local storage 
                this.authenticationService.logout();
                //force him to go to login to re authenticate jim 
                this.router.navigate(['/login']);            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}