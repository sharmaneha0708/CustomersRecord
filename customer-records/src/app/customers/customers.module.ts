import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    CustomersRoutingModule.components,
    MapComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  // exports: [
  //   CustomersComponent,
  //   CustomersCardComponent
  // ]
})
export class CustomersModule {}
