import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomersListComponent } from './customers-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { getTestCustomers, TestCustomerService } from 'src/testing/test-customer.service';

let component: CustomersListComponent;
let fixture: ComponentFixture<CustomersListComponent>;
let page: Page;
const customers = getTestCustomers();

describe('CustomersListComponent', () => {
  beforeEach(waitForAsync(() => {
     TestBed.configureTestingModule({
      declarations: [ CustomersListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {provide: DataStorageService, useClass: TestCustomerService},
      ]
    })
    .compileComponents().then(createComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display customers', () => {
    debugger;
    expect(customers.length).toBeGreaterThan(0);
    expect(page.heroRows.length).toBeGreaterThan(0);
  });

 xit('1st hero should match 1st test hero', () => {
    const expectedHero = customers[0];
    const actualHero = page.heroRows[1].textContent;
    expect(actualHero).toContain(expectedHero.id.toString(), 'hero.id');
    expect(actualHero).toContain(expectedHero.firstName, 'hero.name');
  });

  xit('Clicking the customer name calls onCustomerClick function and navigates to Customer Details page', fakeAsync(() => {
    debugger;
    spyOn(component, 'onCustomerClick');
    let link = fixture.nativeElement.querySelector('a');
    link.click();
    tick();
    expect(component.onCustomerClick).toHaveBeenCalled();
  }));

});


function createComponent() {
  fixture = TestBed.createComponent(CustomersListComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}
class Page {
  /** Hero line elements */
  heroRows: HTMLLIElement[];
debugger;

  /** Highlighted DebugElement */
  highlightDe: DebugElement;

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    const heroRowNodes = fixture.nativeElement.querySelectorAll('tr');
    this.heroRows = Array.from(heroRowNodes);
    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigate as jasmine.Spy;
  }
}
