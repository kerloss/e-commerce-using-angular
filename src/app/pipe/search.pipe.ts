import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  //products[] this is array of product that will search on it
  //searchText this is text that user will search about it
  //we will return array of products and filter it and filter take arrow functioin that take item or product as parameter to loop 
  //by it then take product after that title that you will search on it and transfer it to lowercase and check if include searchText
  transform(products: Product[], searchText: string): Product[] {
    return products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
