import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css']
})
export class CashPaymentComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _ToastrService: ToastrService, private _Router: Router) { };

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
    this._CartService.cashPayment(this.cartId, this.payment.value).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status == 'success') {
          this.messageSuccessCashPayment();
          this._Router.navigate(['/home'])

          this._CartService.cartNumber.next(0);   // to add to cart number of items
        }
      }, error: (err) => console.log(err)
    })
  };

  messageSuccessCashPayment(): void {
    this._ToastrService.success('Your order has been payment successfully', 'Success');
  };
}
