import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _ApidataService: ApidataService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2) { }
  // productDetails:any;    
  //or
  productDetails: Product = {} as Product;
  paramsId: any;

  detailsSliderOptions: OwlOptions = {   //options for the carousel of categories
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
    this._ActivatedRoute.paramMap.subscribe({   //paramap  is a property of activated route which returns an observable parammap. It contains all the parameters passed
      next: (paramaters) => {    //carry the pramaters from URL
        // console.log(paramaters);
        // console.log(paramaters.get('id'));
        this.paramsId = paramaters.get('id')    //return the id of products
        this.getProductDetailsFromApiService()

        /* this._ApidataService.getProductDetails(this.paramsId).subscribe({
          next: (response) => {   //if get request is successfull then execute following code
            // console.log(response.data);
            this.productDetails = response.data;     //store data in variable
          },
          error: (err) => {
            console.log(err);
          }
        })*/
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //concept of call API to get details of product
  getProductDetailsFromApiService(): void {
    this._ApidataService.getProductDetails(this.paramsId).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.productDetails = response.data;
      },
      error: (err) => console.log(err)
    })
  }

  //method add to cart
  addCart(cartId: string, btnElement: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
    this._CartService.addToCart(cartId).subscribe({
      next: (response) => {
        console.log(response);
        this._Renderer2.removeAttribute(btnElement, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);   // to add to cart number of items
        this.showAlertMessage(response.message)
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnElement, 'disabled');
      }
    })
  }

  //toaster alert for adding product into the cart 
  showAlertMessage(message: string) {
    this._ToastrService.success(message, 'Success!');
  }

}
