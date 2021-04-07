import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export { DataStorageService } from 'src/app/shared/data-storage.service';
export { getTestCustomers } from './test-customers';
export { Customer } from 'src/app/customers/customer.model';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { getTestCustomers } from './test-customers';
import { Customer } from 'src/app/customers/customer.model';

@Injectable()

export class TestCustomerService extends DataStorageService {

  constructor() {
    super(null);
  }

  customers = getTestCustomers();
  lastResult: Observable<any>; // result from last method call

  addCustomer(customer: Customer): Observable<{name:string}> {
    throw new Error('Method not implemented.');
  }

  deleteCustomer(id: string): Observable<Customer> {
    throw new Error('Method not implemented.');
  }

  getCustomers(): Observable<Customer[]> {
    return this.lastResult = asyncData(this.customers);
  }

  getCustomer(id: string): Observable<Customer> {
    const customer = this.customers.find(h => h.id === id);
    return this.lastResult = asyncData(customer);
  }

  updateCustomer(customer: Customer, id: string): Observable<Customer> {
    return this.lastResult = this.getCustomer(customer.id).pipe(
      map(h => {
        if (h) {
          return Object.assign(h, customer);
        }
        throw new Error(`Customer ${customer.id} not found`);
      })
    );
  }
}

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

