import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomersModule } from './customers/customers.module';
import { CustomerModule } from './customer/customer.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AlertModule } from './shared/alert/alert.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CustomersModule,
    CustomerModule,
    AboutModule,
    LoginModule,
    AlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
