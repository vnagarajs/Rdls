import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPercentage'
})
export class DiscountPercentagePipe implements PipeTransform {

  transform(currentPrice: any, originalPrice: any): any {
    const discountPercentage = (originalPrice - currentPrice) / originalPrice * 100;
    return discountPercentage
  }

}
