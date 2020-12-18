import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id: number;
  customer: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        debugger;
        this.customer = this.customerService.getCustomer(this.id - 1);
      }
    );
  }

}
