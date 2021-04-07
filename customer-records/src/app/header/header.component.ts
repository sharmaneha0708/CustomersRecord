import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  authenticateText = 'Authenticate';
  subscription: Subscription;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.loginService.authChanged.subscribe(
      (loggedIn: boolean) => {
        this.setAuthenticateText();
      }
    );
  }

  onAuthenticate() {
    if (this.loginService.isAuthenticated) {
      this.setAuthenticateText();
      this.loginService.logOut();
      this.router.navigate(['/customers']);
      return;
    }
    this.navigateToLogin();
  }

  setAuthenticateText() {
    this.authenticateText = this.loginService.isAuthenticated
      ? 'Log Out'
      : 'Authenticate';
  }

  navigateToLogin() {
    this.router.navigate(['./login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
