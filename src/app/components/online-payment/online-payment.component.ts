import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css']
})
export class OnlinePaymentComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _ToastrService: ToastrService) { };

  cartId: any = '';   //Id of Cart

  payment: FormGroup = this._FormBuilder.group({
    details: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', Validators.required],
  });

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('id'));
        this.cartId = params.get('id');
      }, error: err => console.log(err)
    })
  }

  userInfo(): void {
    // console.log(this.payment.value);
    this._CartService.checkOut(this.cartId, this.payment.value).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status == 'success') {
          window.open(response.session.url, '_self');
          this.messageSuccessCheckout();
        }
      }, error: (err) => console.log(err)
    })
  };

  messageSuccessCheckout(): void {
    this._ToastrService.success('Your order has been payment successfully', 'Success');
  };
}
