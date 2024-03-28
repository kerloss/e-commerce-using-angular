import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { };
  
  msgError: string = '';
  isLoading: boolean = false;

  /*  registerForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
      rePassword: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    }, { validators:[this.confirmPassword] } as FormControlOptions );
    */

  registerForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
    rePassword: [''],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {
    validators: [this.confirmPassword]
  });

  submitRegister() {
    if (this.registerForm.valid) {    //to check if data is valid before going to back-end
      // console.log(this.registerForm.value);
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message == 'success') {  //routing to login
            this.isLoading = false;
            this.showSuccessAlert();
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          // console.log(err);
          this.isLoading = false;
          // this.showErrorMessage(err.error.message);
          this.msgError = err.error.message;
        },
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  };

  confirmPassword(form: FormGroup): void {
    let password = form.get('password');
    let rePassword = form.get('rePassword');
    if (rePassword?.value == "") {
      rePassword?.setErrors({ required: true })
    }
    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });

    }
  }

  showSuccessAlert(): void {
    this._ToastrService.success("Registration SUCCESS", "SUCCESS");
  };
  showErrorMessage(msgError: string): void {
    this._ToastrService.error(msgError, "ERROR");
  };
}
