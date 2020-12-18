import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers/:id', data: { preload: true }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' } // catch any unfound routes and redirect to home page

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
