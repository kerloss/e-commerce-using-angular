import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, symbol: string): string {
    return value.toLocaleString('en-US') + symbol;    //toLocateString this method to make price with US format
  }

}
