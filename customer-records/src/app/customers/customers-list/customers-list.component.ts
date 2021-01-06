import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SorterService } from 'src/app/shared/sorter.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sorterService: SorterService
  ) {}

  ngOnInit(): void {}

  sortByProperty(property: string) {
    const array = this.customers;
    array.sort(this.sorterService.dynamicSort(property));
  }

  onCustomerClick(id: number) {
    this.router.navigate(['./', id, 'details'], { relativeTo: this.route });
  }
}
