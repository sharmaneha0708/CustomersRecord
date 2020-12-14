import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomersCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    CustomersRoutingModule
  ],
  exports: [
    CustomersComponent,
    CustomersCardComponent
  ]
})
export class CustomersModule {}
