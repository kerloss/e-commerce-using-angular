import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories';
import { Product } from 'src/app/interfaces/product';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _ApidataService: ApidataService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2) { }

  allProducts: Product[] = [];
  categories: Categories[] = [];

  searchText: string = '';   //to use search term using 2 way data biniding [(ngModul)]-->html
  subscribtion!: any;   //declare this to use it ondestroy

  categoriesSliderOptions: OwlOptions = {   //options for the carousel of categories
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      400: {
        items: 2
      },
      500: {
        items: 3
      },
      700: {
        items: 4
      },
      800: {
        items: 5
      },
      1000: {
        items: 6
      },
    },
    nav: true
  }

  mainSlider: OwlOptions = {   //options fot the carousel of mainslider
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplaySpeed: 1500,    //speed of the carousel
    autoplayTimeout: 5000, //timeout for slide to slide
    autoplayHoverPause: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties
    //get all products
    this.subscribtion = this._ApidataService.getAllProducts().subscribe({
      next: (response) => {
        // console.log(response);
        this.allProducts = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    })

    //get categories
    this._ApidataService.getCategories().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.categories = response.data;
      },
      error: (err) => console.log(err),
    })
  };

  //add to cart
  addCart(cartId: string, btnElement: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true')
    this._CartService.addToCart(cartId).subscribe({
      next: (response) => {
        // console.log(response);
        this.addToCartMessage(response.message);
        this._Renderer2.removeAttribute(btnElement, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);   // to add to cart number of items
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnElement, 'disabled');
      }
    })
  }

  // toaster show when add to cart successfully
  addToCartMessage(message: string): void {
    this._ToastrService.success(message, 'Success!');
  };

  /*  ngOnDestroy(): void {
      this.subscribtion.unsubscribe();
      console.log('Destroyed home');
    }*/

  /*  getAllProducts() {
      this._ApidataService.getAllProducts().subscribe({
        next: (response) => {
          // console.log(response);
          this.allProducts = response.data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } */
}
