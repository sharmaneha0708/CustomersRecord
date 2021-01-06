import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SorterService {
  constructor() {}

  dynamicSort(property: string) {
    var sortOrder = 1;
    return function (a: any, b: any) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}
