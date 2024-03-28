import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeaderHTTPInterceptor implements HttpInterceptor {

  constructor(private _Router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      let headers: any = { token: localStorage.getItem('token') }
      request = request.clone({ setHeaders: headers })   //request it carying the request
    } else {
      this._Router.navigate([`/login`]);    //not logged in -> navigate to login page
    }
    return next.handle(request);
  }
}
