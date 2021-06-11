import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL } from '../environment';
import { AuthenticationService } from './authentication-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const token = this.authenticationService.token
        // console.log(token == localStorage.currentUser)
        const isApiUrl = request.url.startsWith(URL.apiUrl);
        if (token && isApiUrl) {
            request = request.clone({
                setHeaders: {
                  authorization: token
                }
            });
        }

        return next.handle(request);
    }
}