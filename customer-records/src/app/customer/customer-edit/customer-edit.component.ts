import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  id: string;
  editMode = false;
  customer: Customer = {
    firstName: '',
    lastName: '',
    id: null,
    gender: '',
    city: '',
    state: '',
    address: '',
    latitude: 0,
    longitude: 0,
  };

  alertMessage: string = null;

  @ViewChild('f', { static: false }) customerForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  dismissAlert() {
    this.alertMessage = null;
  }

  ngOnInit(): void {
    debugger;
    this.route.parent.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id == 'null') {
        this.editMode = false;
      } else {
        this.editMode = true;
        this.getSelectedCustomer();
      }
    });
  }

  getSelectedCustomer() {
    this.dataStorageService
      .getCustomer(this.id)
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }

  onCancel() {
    this.router.navigate(['/customers'], { relativeTo: this.route });
  }

  onDelete() {
    this.dataStorageService.deleteCustomer(this.id).subscribe((response) => {
      console.log(response);
      if (response) {
        this.router.navigate(['/customers'], { relativeTo: this.route });
      } else {
        this.alertMessage = 'Unable to delete customer';
      }
    });
  }

  onSubmit() {
    if (!this.editMode) {
      //add user
      this.customer = {
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        id: '',
        gender: this.customerForm.value.gender,
        city: this.customerForm.value.city,
        state: this.customerForm.value.state,
        address: this.customerForm.value.address,
        latitude: 0,
        longitude: 0,
      };
      this.dataStorageService
        .addCustomer(this.customer)
        .subscribe((response) => {
          console.log(response);
          if (response) {
            this.customerForm.form.markAsPristine();
            this.router.navigate(['/customers'], { relativeTo: this.route });
          } else {
            this.alertMessage = 'Unable to add new customer';
          }
        });
    } else {
      // update
      this.dataStorageService
        .updateCustomer(this.customer, this.id)
        .subscribe((responseStatus) => {
          debugger;
          console.log(responseStatus);
          if (responseStatus) {
            this.customerForm.form.markAsPristine();
            this.alertMessage = 'Customer updated successfully!';
          } else {
            this.alertMessage = 'Unable to update customer';
          }
        });
    }
  }
}
