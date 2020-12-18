import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;

  constructor(private router: Router, private route: ActivatedRoute, private customerService: CustomerService) {
   }

  ngOnInit(): void {
    this.displayMode = DisplayModeEnum.Card;
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
}
  onCustomersCard() {
    this.router.navigate(['customers-card'], {relativeTo: this.route});
    debugger;
  }


}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
