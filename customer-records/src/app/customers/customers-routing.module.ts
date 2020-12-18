import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersComponent } from './customers.component';

// const routes: Routes = [
//   {
//     path: 'customers',
//     component: CustomersComponent,
//     children: [
//       { path: '', component: CustomersCardComponent },
//       // { path: 'customer', component: CustomerComponent},
//       // { path: ':id/details', component:CustomerDetailsComponent}
//     ]
//   },
// ];

const routes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {
  static components = [ CustomersComponent, CustomersCardComponent ];
}
