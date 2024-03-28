import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _ToastrService: ToastrService, private _Renderer2: Renderer2, private _Router: Router) { }

  step1: boolean = true;   //forget password
  step2: boolean = false;    //reset code
  step3: boolean = false;    //new password

  email: string = '';
  isLoading: boolean = false;
  userMsg: string = '';

  forgetPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })
  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required]]
  })
  newPasswordForm: FormGroup = this._FormBuilder.group({
    newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]]
  })

  forgetPassword(btnElement: HTMLButtonElement): void {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      let userEmail = this.forgetPasswordForm.value;
      this.email = userEmail.email;
      this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
      this._AuthService.forgetPassword(userEmail).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.statusMsg == 'success') {
            this.isLoading = false;
            this._Renderer2.removeAttribute(btnElement, 'disabled');
            this.messageSuccessForgetPassword();
            this.step1 = false;
            this.step2 = true;
          }
        },
        error: (error) => {
          console.log(error);
          this.userMsg = error.error.message;
          this.isLoading = false;
          this._Renderer2.removeAttribute(btnElement, 'disabled');
        },
        complete: () => {
          this.userMsg = '';
        }
      })
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }

  resetCode(btnElement: HTMLButtonElement): void {
    if (this.resetCodeForm.valid) {
      this.isLoading = true;
      this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
      this._AuthService.resetCode(this.resetCodeForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.status == 'Success') {
            this.isLoading = false;
            this._Renderer2.removeAttribute(btnElement, 'disabled');
            this.messageSuccessResetCode();
            this.step2 = false;
            this.step3 = true;
          }
        }, error: (err) => {
          console.log(err);
          this.userMsg = err.error.message;
          this.isLoading = false;
          this._Renderer2.removeAttribute(btnElement, 'disabled');
        }, complete: () => {
          this.userMsg = '';
        }
      })
    } else {
      this.resetCodeForm.markAllAsTouched();
    }
  }

  newPassword(btnElement: HTMLButtonElement): void {
    if (this.newPasswordForm.valid) {
      let resetPassword = this.newPasswordForm.value;
      resetPassword.email = this.email;
      this.isLoading = true;
      this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
      this._AuthService.resetPassword(resetPassword).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.token) {
            this.messageSuccessNewPassword();
            this.isLoading = false;
            this._Renderer2.removeAttribute(btnElement, 'disabled');
            localStorage.setItem('token', response.token);
            this._Router.navigate(['/home']);
          }
        }, error: (err) => {
          console.log(err);
          this.userMsg = err.error.message;
          this.isLoading = false;
          this._Renderer2.removeAttribute(btnElement, 'disabled');
        }, complete: () => {
          this.userMsg = '';
        }
      })
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }

  messageSuccessForgetPassword(): void {
    this._ToastrService.success('Reset code has been sent to your email', "Success!");
  }

  messageSuccessResetCode(): void {
    this._ToastrService.success('Reset code is Right', "Success!");
  }
  messageSuccessNewPassword(): void {
    this._ToastrService.success('New password is Right', "Success!");
  }
}
