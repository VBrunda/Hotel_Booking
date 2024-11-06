import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(list: any[], field:string): any[] {
    if(!list || !field) return list;
    const uniqueValues = list.map(items => items[field]).filter((value, index, array) => array.indexOf(value) === index);
    return uniqueValues;
  }

}
