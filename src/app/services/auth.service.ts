import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _ToastrService: ToastrService) { }

  userData: any;
  userId: string = '';

  private logoutTimeout: any;
  private loginTime: any;

  startLogoutTimer() {
    const logoutTimeInMinutes = 30; // Set the logout time in minutes
    const logoutTimeInMillis = logoutTimeInMinutes * 60 * 1000; // Convert logout time to milliseconds

    this.loginTime = Date.now();

    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, logoutTimeInMillis);
  }

  clearLogoutTimer() {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
      this.loginTime = null;
    }
  }

  decodeUserDataToken(): any {
    if (localStorage.getItem("token") != null) {
      const encodeToken: any = localStorage.getItem('token');
      const decodeToken = jwtDecode(encodeToken);
      // return decodeToken;
      this.userData = decodeToken;
      // console.log('userData', this.userData);
      this.userId = this.userData.id;
      // console.log('userId', this.userId);
      return this.userId;
    }
  }

  logout(): void {
    // Perform any necessary logout actions, such as clearing tokens or session data
    localStorage.removeItem("token");   //to clear token from localstorage
    this._Router.navigate(['login']);   //redirect to login page
    this._ToastrService.warning("Your session has expired. Please Login again", "Session has expired");
  }

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData);
  };

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData);
  }

  forgetPassword(email: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, email);
  }

  resetCode(restCode: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, restCode);
  }

  resetPassword(resetPassword: object): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, resetPassword);
  }
}
