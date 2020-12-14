import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      { path: 'customers-card', component: CustomersCardComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
