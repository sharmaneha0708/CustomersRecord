import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Customer, getTestCustomers } from 'src/testing/test-customer.service';
import { CustomerComponent } from '../customer/customer.component';
import { DataStorageService } from '../shared/data-storage.service';

import { CustomersComponent } from './customers.component';
//const customers = getTestCustomers();


describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpClientTestingModule;
  let service: DataStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent],
      imports: [ HttpClientTestingModule ],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpClientTestingModule);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    component.customers = getTestCustomers();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 number anchor', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelectorAll('a').length).toEqual(4);
  });

  it("should call getCustomers and return list of customers", waitForAsync(() => {
    debugger;
    const response: Customer[] = [];
    service = TestBed.inject(DataStorageService);
    spyOn(service, 'getCustomers').and.returnValue(of(response))
    component.getCustomersData();
    fixture.detectChanges();
    expect(component.customers).toEqual(response);
  }));



  // it('should fetch data successfully if called asynchronously', fakeAsync(() => {
  //   let fixture = TestBed.createComponent(CustomerComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   let dataStorageService = fixture.debugElement.injector.get(DataStorageService);
  //   let spy = spyOn(dataStorageService, 'getCustomers')
  //     .and.returnValue(Promise.resolve('Data'));
  //   fixture.detectChanges();
  //   tick();
  //   expect(app.data).toBe('Data');

  // }));
});
