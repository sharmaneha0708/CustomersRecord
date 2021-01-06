import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })

export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Observable<boolean>
    | Promise<boolean> {
      if (this.loginService.isAuthenticated) {
        return true;
    }

    // Track URL user is trying to go to so we can send them there after logging in
    this.loginService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
    }

