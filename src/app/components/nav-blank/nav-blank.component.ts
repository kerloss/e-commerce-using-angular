import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router: Router, private _AuthService: AuthService, private _Renderer2: Renderer2, private _CartService: CartService) { }

  @ViewChild('navbar') navElement!: ElementRef

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 50) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'py-4');
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-4');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'py-4');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-4');
    }
  }

  cartNum: number = 0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        // console.log('navbar', data);   //number of cart items
        this.cartNum = data;
      }
    });
    this._CartService.getProductsToCart().subscribe({
      next: (response) => {
        // console.log(response);
        this.cartNum = response.numOfCartItems;
      }
    })
  };

  /*
    logoutUser(): void {
      localStorage.removeItem("token");   //to clear token from localstorage
      this._Router.navigate(['login']);   //redirect to login page
    }
    */

  logoutUser(): void {
    this._AuthService.logout()
    this._AuthService.clearLogoutTimer();   //clear the logout timer when the user logs out
  }
}
