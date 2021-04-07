import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModuleFactoryLoader } from "@angular/core";
import { TestBed, fakeAsync, tick, async, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Location } from "@angular/common";
import { routes } from "./app-routing.module";
import { AboutModule } from "./about/about.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { CustomersModule } from "./customers/customers.module";
import { CustomerModule } from "./customer/customer.module";

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
  TestBed.configureTestingModule({
      imports:[
          RouterTestingModule.withRoutes(routes),
          HttpClientModule
      ],
      declarations: [
          AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
  })

  router = TestBed.inject(Router);
  location = TestBed.inject(Location);

  fixture = TestBed.createComponent(AppComponent);
  fixture.ngZone.run(() => {
    router.initialNavigation();
  });
  });

  it('should navigate to About', fakeAsync(() => {
      const loader = TestBed.get(NgModuleFactoryLoader);
      loader.stubbedModules = {lazyModule : AboutModule }
      router.resetConfig([
          {path: 'about', loadChildren: () => Promise.resolve(AboutModule)},
      ]);
      fixture.ngZone.run(() => {
        router.navigate(['about']);
      });

      tick(50);
      fixture.detectChanges();
      expect(location.path()).toBe('/about');
  }));

  it('should navigate to Login', fakeAsync(() => {
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {lazyModule : LoginModule }
    router.resetConfig([
        {path: 'login', loadChildren: () => Promise.resolve(LoginModule)},
    ]);
    fixture.ngZone.run(() => {
      router.navigate(['login']);
    });
    tick(50);
    fixture.detectChanges();
    expect(location.path()).toBe('/login');
}));

it('should navigate to Customers', fakeAsync(() => {
  const loader = TestBed.get(NgModuleFactoryLoader);
  loader.stubbedModules = {lazyModule : CustomerModule }
  router.resetConfig([
      {path: 'customers/:id', loadChildren: () => Promise.resolve(CustomerModule)},
  ]);
  fixture.ngZone.run(() => {
    router.navigate(['customers/2']);
  });
  tick(50);
  fixture.detectChanges();
  expect(location.path()).toBe('/customers/2');
}));

it('navigate to "customers" takes you to /customers', waitForAsync(() => {
  const loader = TestBed.get(NgModuleFactoryLoader);
  loader.stubbedModules = {lazyModule : CustomersModule };
  router.resetConfig([
    {path: 'customers', loadChildren: () => Promise.resolve(CustomersModule)}
  ]);
  fixture.ngZone.run(() => {
    router.navigate(['customers']).then(() => {
        expect(location.path()).toBe('/customers');
    });
  });
}));


});
