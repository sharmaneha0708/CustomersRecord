import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Customer } from '../customers/customer.model';
import { DataStorageService } from './data-storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('DataStorageService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dataStorageService: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ DataStorageService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    dataStorageService = TestBed.inject(DataStorageService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// DataStorageService method tests begin ///
  describe('#getCustomers', () => {
    let expectedCustomers: Customer[];

    beforeEach(() => {
      dataStorageService = TestBed.inject(DataStorageService);
      expectedCustomers = [
      { firstName: 'Vaanya', lastName: 'Sharma', id: '0', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0},
      { firstName: 'Vaanz', lastName: 'Sharma', id: '1', gender: 'male', city: 'Missis', state: 'Ontario', address: 'efg street', latitude: 0, longitude: 0 }
       ] as Customer[];
    });

    it('should return expected customers', () => {
      debugger;
      dataStorageService.getCustomers().subscribe(
        customers => expect(customers).toEqual(expectedCustomers, 'should return expected customers'),
        fail
      );
      // DataStorageService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}.json`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock customers
      req.flush(expectedCustomers);
    });

    it('should be OK returning no customers', () => {
      dataStorageService.getCustomers().subscribe(
        customers => expect(customers.length).toEqual(0, 'should have empty customers array'),
        fail
      );
      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}.json`);
      req.flush([]); // Respond with no customers
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'An unknown error occurred!';
      dataStorageService.getCustomers().subscribe(
        customers => fail('expected to fail'),
        error => expect(error.message || error).toContain(msg)
      );
      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}.json`);
      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#getCustomer', () => {
    let expectedCustomer = {firstName: 'Vaanya', lastName: 'Sharma', id: '0', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0};
    it('should return expected customer (single customer)', () => {
      dataStorageService.getCustomer('1').subscribe(
        customer => expect(customer).toEqual(expectedCustomer, 'should return expected customer (single)'),
        fail
      );
      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}/1.json`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCustomer);
    });
  });

  describe('#addCustomer', () => {
    it('should add a new customer', () => {
      const newCustomer: Customer = {firstName: 'Vaanya', lastName: 'Sharma', id: '', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0};
      dataStorageService.addCustomer(newCustomer).subscribe(
        data => expect(data).toEqual({name:'sss'}, 'should return a new customer'),
        fail
      );
      // DataStorageService should have made one request to POST new customer
      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}.json`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newCustomer);
      // Expect server to return the customer saved with what name after POST
      let expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: {name:'sss'} });
      req.event(expectedResponse);

    });
  });

  describe('#updateCustomer', () => {
    it('it should update an existing customer and return it', () => {
      const updateCustomer: Customer = {firstName: 'Vaanya', lastName: 'Sharma', id: '1', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0};
      dataStorageService.updateCustomer(updateCustomer, updateCustomer.id).subscribe(
        data => expect(data).toEqual(updateCustomer, 'should return the customer'),
        fail
      );

      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}/1.json`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateCustomer);

      let expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: updateCustomer });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'An unknown error occurred!';
      const updateCustomer: Customer = {firstName: 'Vaanya', lastName: 'Sharma', id: '1', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0};
      dataStorageService.updateCustomer(updateCustomer, updateCustomer.id).subscribe(
        customers => fail('expected to fail'),
        error => expect(error.message || error).toContain(msg)
      );

      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}/1.json`);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#deleteCustomer', () => {
    it('should delete the customer', () => {
      const deleteCustomer: Customer = {firstName: 'Vaanya', lastName: 'Sharma', id: '2', gender: 'female', city: 'Mississauga', state: 'Ontario', address: 'abc street', latitude: 0, longitude: 0};

      dataStorageService.deleteCustomer('2').subscribe(
        data => expect(JSON.stringify(data)).toContain(deleteCustomer.id),
        fail
      );

      const req = httpTestingController.expectOne(`${dataStorageService.customersUrl}/2.json`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(2);
    });
  });
});
