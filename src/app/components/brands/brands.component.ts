import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/interfaces/brands';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { }

  brands: Brands[] = [];

  pageSize: number = 0;    //limit of pages
  currentPage: number = 0;
  total: number = 0;    //result of products from API

  ngOnInit(): void {
    this._ApidataService.getBrands().subscribe({
      next: (response) => {
        // console.log(response);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.result;
        this.brands = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  pageChanged(event: any): void {
    // console.log(event);
    this._ApidataService.getBrands(event).subscribe({
      next: (response) => {
        // console.log(response);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.result;
        this.brands = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

}
