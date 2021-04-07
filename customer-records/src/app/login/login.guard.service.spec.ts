import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authService: LoginService;
  let guard: LoginGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [LoginGuard, { provide: Router, useValue: routerMock },],
    imports: [HttpClientTestingModule]
  });
  authService = TestBed.inject(LoginService);
  guard = TestBed.inject(LoginGuard);
});

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow the authenticated user to access app', () => {
    //spyOn(authService, 'isAuthenticated').and.returnValue(true);
    authService.isAuthenticated = true;
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
