import { Injectable } from '@angular/core';
import { Customer } from '../customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private  customers: Customer[] = [
    new Customer('Neha', 'Sharma', 1, 'female', 'Mississauga', 'Ontario', '2170 Sherobee Road.'),
    new Customer('Mohit', 'Sharma', 2, 'female', 'Markham', 'Ontario', '2170 Sherobee Road.'),
    new Customer('Shree', 'Sharma', 3, 'male', 'Oakville', 'Ontario', '2170 Sherobee Road.'),
    new Customer('Rahul', 'Sharma', 4, 'female', 'Vaughan', 'Ontario', '2170 Sherobee Road'),
    new Customer('Vaanya', 'Sharma', 5, 'female', 'Burlington', 'Ontario', '2170 Sherobee Road'),
    new Customer('Kari', 'Sharma', 6, 'male', 'Toronto', 'Ontario', '2170 Sherobee Road'),
    new Customer('Dev', 'Sharma', 7, 'female', 'Oshawa', 'Ontario', '2170 Sherobee Road'),
    new Customer('Aarav', 'Sharma', 8, 'female', 'Whitby', 'Ontario', '2170 Sherobee Road'),

  ];

  private isCustomerInfoClicked: boolean = false;
  public navElement: HTMLElement;
  constructor() { }

  getCustomer(id: number) {
    return this.customers[id];
  }

  getCustomers() {
    return this.customers.slice();
  }

  setCustomerInfoClicked(state: boolean) {
    this.isCustomerInfoClicked = state;
  }

  getCustomerInfoClicked() {
    return this.isCustomerInfoClicked;
  }

}
