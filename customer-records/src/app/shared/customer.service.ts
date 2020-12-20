import { Injectable } from '@angular/core';
import { Customer } from '../customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private  customers: Customer[] = [
    new Customer('Neha', 'Sharma', 1, 'female', 'Mississauga', 'Ontario', '2170 Sherobee Road.', 43.5722284, -79.6048998),
    new Customer('Mohit', 'Sharma', 2, 'male', 'Markham', 'Ontario', 'Royal Bank', 43.7936744, -79.2407288),
    new Customer('Shree', 'Sharma', 3, 'female', 'Oakville', 'Ontario', 'Oakville Place.', 43.4616051, -79.6891012),
    new Customer('Rahul', 'Sharma', 4, 'male', 'Vaughan', 'Ontario', 'Vaughan Mills', 43.8229243, -79.5356548),
    new Customer('Vaanya', 'Sharma', 5, 'female', 'Burlington', 'Ontario', 'Executive Airpark Airport', 43.441513, -79.8524275),
    new Customer('Kari', 'Sharma', 6, 'female', 'Toronto', 'Ontario', 'Toronto Centre', 43.6544421, -79.3828881),
    new Customer('Dev', 'Sharma', 7, 'male', 'Oshawa', 'Ontario', 'Parkwood Estate', 43.9485185, -79.01844),
    new Customer('Aarav', 'Sharma', 8, 'male', 'Whitby', 'Ontario', 'Whitby GO Station', 43.8657878, -78.9397587),

  ];

  constructor() { }

  getCustomer(id: number) {
    return this.customers[id];
  }

  getCustomers() {
    return this.customers.slice();
  }




}
