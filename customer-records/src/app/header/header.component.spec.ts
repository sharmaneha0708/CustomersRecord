import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app-routing.module';
import { By } from '@angular/platform-browser';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

describe('HeaderComponent & AppModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({imports: [AppModule, RouterTestingModule]})
        // Get rid of app's Router configuration otherwise many failures.
        // Doing so removes Router declarations; add the Router stubs
        .overrideModule(AppModule, {
          remove: {imports: [AppRoutingModule]},
          add: {declarations: [RouterLinkDirectiveStub]}
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HeaderComponent);
          component = fixture.componentInstance;
        });
  }));

  tests();
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges();  // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('can instantiate the component', () => {
    expect(component).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('');
    expect(routerLinks[1].linkParams).toBe('/customers');
    expect(routerLinks[2].linkParams).toBe('/about');
  });

  it('can click Customers link in template', () => {
    const customersLinkDe = linkDes[1];    // customers link DebugElement
    const customersLink = routerLinks[1];  // customers link directive

    expect(customersLink.navigatedTo).toBeNull('should not have navigated yet');

    customersLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(customersLink.navigatedTo).toBe('/customers');
  });
}


