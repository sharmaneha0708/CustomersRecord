import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from './customer-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { LoginService } from '../login/login.service';

describe('CustomerRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let authService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [CustomerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    authService = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(CustomerComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
  });

  it('navigate to "details" takes you to /details', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['details']);
    });
    tick();
    expect(location.path()).toBe('/details');
  }));

  it('navigate to "edit" takes you to /edit', fakeAsync(() => {
    authService.isAuthenticated = true;
    fixture.ngZone.run(() => {
      router.navigate(['edit']);
    });
    tick();
    expect(location.path()).toBe('/edit');
  }));
});
