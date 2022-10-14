import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrSlice'
})
export class ArraySlicePipe implements PipeTransform {

  transform(array: any[], numOfSliced: number): any {
    let slicedArr: any[] = [];
    let count = array.length > numOfSliced ? numOfSliced : array.length;
    for (var i = 0; i < count ; i++) {
        slicedArr.push(array[i]);
    }
    return slicedArr;
  }
}
