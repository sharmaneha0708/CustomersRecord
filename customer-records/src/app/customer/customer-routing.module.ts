import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../login/login.guard.service';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerComponent } from './customer.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'details', component: CustomerDetailsComponent},
      {
        path: 'edit',
        component: CustomerEditComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
  static components = [ CustomerComponent, CustomerDetailsComponent, CustomerEditComponent ];

}
