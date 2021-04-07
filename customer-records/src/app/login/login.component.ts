import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = false;
  alertMessage: string = null;
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return ;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if(this.isLoginMode) {
      this.loginService.logIn(email, password).subscribe(responseData => {
        console.log(responseData);
        if (this.loginService.redirectUrl) {
          const redirectUrl = this.loginService.redirectUrl;
          this.loginService.redirectUrl = '';
          this.router.navigate([redirectUrl]);
      } else {
        this.router.navigate(['/customers'], {relativeTo: this.route});
      }
      },
      errorResponse => {
        console.log(errorResponse);
        this.alertMessage = errorResponse;
      })
    } else {
      this.loginService.signUp(email, password).subscribe(responseData => {
        console.log(responseData);
        if (this.loginService.redirectUrl) {
          const redirectUrl = this.loginService.redirectUrl;
          this.loginService.redirectUrl = '';
          this.router.navigate([redirectUrl]);
      } else {
        this.router.navigate(['/customers'], {relativeTo: this.route});
      }
      },
      errorResponse => {
        console.log(errorResponse);
        this.alertMessage = errorResponse;
      })
    }
  }

  dismissAlert() {
    this.alertMessage = null;
  }

}
