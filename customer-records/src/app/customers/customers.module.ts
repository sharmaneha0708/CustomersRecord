import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { FilterPipe} from '../shared/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FilterPipe,
    CustomersRoutingModule.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomersRoutingModule,
    Ng2SearchPipeModule
  ],

})
export class CustomersModule {}
