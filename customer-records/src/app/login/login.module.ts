import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../shared/alert/alert.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginRoutingModule.components],
  imports: [ CommonModule, FormsModule, AlertModule, LoginRoutingModule],
})
export class LoginModule {}
