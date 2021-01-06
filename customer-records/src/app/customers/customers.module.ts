import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { FilterPipe} from '../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FilterPipe,
    CustomersRoutingModule.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule
  ],

})
export class CustomersModule {}
