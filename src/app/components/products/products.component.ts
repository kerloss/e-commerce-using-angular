import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _ApidataService: ApidataService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2) { }

  allProducts: Product[] = [];

  searchText: string = ''   //search text for products
  pageSize: number = 0;    //limit of pages
  currentPage: number = 0;
  total: number = 0;    //result of products from API

  // sortOptions: string = '';

  ngOnInit(): void {
    this._ApidataService.getAllProducts().subscribe({
      next: (response) => {
        // console.log(response);
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: error => console.log(error)
    })
  }

  //Add products to cart
  addCart(cartId: string, btnElement: HTMLButtonElement) {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
    this._CartService.addToCart(cartId).subscribe({
      next: (response) => {
        // console.log(response);
        this.addToCartMessage(response.message)
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

  pageChanged(event: any): void {
    // console.log(event);
    this._ApidataService.getAllProducts(event).subscribe({
      next: (response) => {
        // console.log(response);
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: error => console.log(error)
    })
  }

  // sortProduct(sort: any): void {
  //   this._ApidataService.getAllProducts(sort).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.allProducts = response.data;
  //     },
  //     error: error => console.log(error)
  //   })
  // }
}
