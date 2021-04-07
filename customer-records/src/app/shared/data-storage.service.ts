import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from '../customers/customer.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  customersUrl = 'https://customer-records-3867b-default-rtdb.firebaseio.com//customers';
  constructor(
    private http: HttpClient
  ) {}


  getCustomers() {
     return this.http
      .get<Customer[]>(`${this.customersUrl}.json`)
      .pipe(map((responseData) => {
        debugger;
        const keys = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            keys.push({...responseData[key], id: key });
          }
        }
        return keys;
      }),
      catchError(this.handleError));
  }

  getCustomer(id: string) {
    return this.http
      .get<Customer>(`${this.customersUrl}/${id}.json`)
      .pipe(catchError(this.handleError));
  }

  addCustomer(customer: Customer) {
    return this.http
      .post<{name:string}>(`${this.customersUrl}.json`, customer)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(customer: Customer, id: string) {
    return this.http
      .put<Customer>(`${this.customersUrl}/${id}.json`, customer)
      .pipe(map(response => response),
        catchError(this.handleError));
  }

    deleteCustomer(id: string) {
      return this.http
        .delete<Customer>(`${this.customersUrl}/${id}.json`)
        .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
