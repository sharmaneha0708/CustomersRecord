import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
  declarations: [
    CustomerRoutingModule.components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    CustomerRoutingModule
  ],
})
export class CustomerModule {}
