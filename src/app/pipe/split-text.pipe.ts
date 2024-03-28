import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText'
})
export class SplitTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.split(" ", limit).join(" ");
  }

}
