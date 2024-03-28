import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartItem } from './../../interfaces/all-order-of-user';
import { Component, OnInit } from '@angular/core';
import { AllOrderOfUser } from 'src/app/interfaces/all-order-of-user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  constructor(private _CartService: CartService, private _AuthService: AuthService) { }

  userId: string = '';
  allOrders: AllOrderOfUser[] = [];
  
  allOrdersSliderOptions: OwlOptions = {   //options for the carousel of categories
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayHoverPause: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this.userId = this._AuthService.decodeUserDataToken();
    // console.log(this.userId);

    this._CartService.userOrders(this.userId).subscribe({
      next: (response) => {
        console.log('allOrder', response);
        this.allOrders = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
