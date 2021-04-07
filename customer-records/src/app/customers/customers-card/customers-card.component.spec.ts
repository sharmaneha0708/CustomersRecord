import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestCustomers, TestCustomerService } from 'src/testing/test-customer.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersCardComponent } from './customers-card.component';

let component: CustomersCardComponent;
let fixture: ComponentFixture<CustomersCardComponent>;
let page: Page;
const customers = getTestCustomers();


describe('CustomersCardComponent', () => {
  beforeEach(waitForAsync(() => {
     TestBed.configureTestingModule({
      declarations: [ CustomersCardComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {provide: DataStorageService, useClass: TestCustomerService},
      ]
    })
    .compileComponents().then(createComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCardComponent);
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
});

function createComponent() {
  fixture = TestBed.createComponent(CustomersCardComponent);
  component = fixture.componentInstance;
  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}
class Page {
  heroRows: HTMLLIElement[];
  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    const heroRowNodes = fixture.nativeElement.querySelectorAll('div');
    this.heroRows = Array.from(heroRowNodes);
    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigate as jasmine.Spy;
  }
}

