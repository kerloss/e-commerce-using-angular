import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2) { }

  cartProduct: Cart = {} as Cart;

  ngOnInit(): void {
    this._CartService.getProductsToCart().subscribe({
      next: (response) => {
        // console.log(response);
        // console.log(response.data);
        this.cartProduct = response;
      },
      error: err => console.log(err),
    })
  }

  removeCartItem(productId: string, btnElement: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
    this._CartService.removeProductFromCart(productId).subscribe({
      next: (response) => {
        // console.log(response);
        this._Renderer2.removeAttribute(btnElement, 'disabled');
        this.messageSuccessRemoveItem();
        this.cartProduct = response;    //to make change on Angular and override it

        this._CartService.cartNumber.next(response.numOfCartItems);   // to add to cart number of items
      },
      error: (err) => {
        this._Renderer2.removeAttribute(btnElement, 'disabled');
        console.log(err);
      }
    })
  };

  changeCount(productId: string, count: number, btnElement: HTMLButtonElement): void {
    if (count > 0) {
      this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
      this._CartService.updateCartQuantity(productId, count).subscribe({
        next: (response) => {
          // console.log(response);
          this._Renderer2.removeAttribute(btnElement, 'disabled');
          this.messageSuccessUpdateQuantity();
          this.cartProduct = response;
        },
        error: (err) => {
          console.log(err)
          this._Renderer2.removeAttribute(btnElement, 'disabled');
        }
      })
    }
    else {
      this.messageErrorUpdateQuantity();
    }
  }

  clearAllProducts(btnElement: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
    this._CartService.clearAllProducts().subscribe({
      next: (response) => {
        // console.log(response);
        if (response.message === 'success') {
          this._Renderer2.removeAttribute(btnElement, 'disabled');
          this.messageSuccessClearAllProducts();

          this._CartService.cartNumber.next(0);   // to add to cart number of items
        }
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnElement, 'disabled');
      },
      complete: () => {
        this.cartProduct = {} as Cart;
      }
    })
  }

  // toaster show when remove product from cart
  messageSuccessRemoveItem(): void {
    this._ToastrService.success('Remove Product', 'Success!');
  };

  //toaster show when change in quantity of product
  messageSuccessUpdateQuantity(): void {
    this._ToastrService.success('Update Quantity', 'Success!');
  };

  //toaster show when change in quantity of product
  messageErrorUpdateQuantity(): void {
    this._ToastrService.error('It is less amount', 'Error!');
  };

  // toaster show when clear all products from cart successfully
  messageSuccessClearAllProducts(): void {
    this._ToastrService.success('Clear All Products', 'Success!');
  };
}
