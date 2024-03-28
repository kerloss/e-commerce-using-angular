import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(pageNum: number = 1, sort: string = ''): Observable<any> {    //give default prameter value =1
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}&sort=${sort}`);
  }
  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  getCategoriesDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
  getBrands(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}`);
  }
}
