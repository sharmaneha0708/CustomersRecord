import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    // CustomerComponent,
    // CustomerDetailsComponent,
    CustomerRoutingModule.components
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ],
  // exports: [
  //   CustomerComponent,
  //   CustomerDetailsComponent
  // ]
})
export class CustomerModule {}
