import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.css']
})
export class CustomersCardComponent implements OnInit {
   customers: Customer[] ;


  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
  }

  onCustomerClick(id: number) {
   this.router.navigate(['./', id, 'details'], {relativeTo: this.route});
  }

}
