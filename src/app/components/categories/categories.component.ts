import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/interfaces/categories';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { }

  category: Categories[] = [];

  ngOnInit(): void {
    this._ApidataService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.category = response.data;
      },
    })
  }
}
