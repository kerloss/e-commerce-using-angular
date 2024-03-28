import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { };
  msgError: string = '';
  isLoading: boolean = false
  // UserDataFromToken: any;
  /*
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
  });
*/
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]]
  });

  submitLogin() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this._AuthService.startLogoutTimer();    //to start the timer after login
      this.isLoading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message == 'success') {  //routing to home page
            this.isLoading = false;

            // this.userDataFromToken = this._AuthService.decodeUserDataToken();  //using this to decode data from token
            // console.log(this.userDataFromToken);

            this.showSuccesAlert(response.user.name);
            localStorage.setItem("token", response.token);
            this._Router.navigate(['/home'])
          }
        },
        error: (err) => {
          // console.log(err);
          this.isLoading = false;
          // this.showErrorAlert(err.error.message);
          this.msgError = err.error.message;
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  showSuccesAlert(userName: string): void {
    this._ToastrService.success("Welcome " + userName, "Success!");
  };
  showErrorAlert(msgError: string): void {
    this._ToastrService.error(msgError, "ERROR")
  };
}
