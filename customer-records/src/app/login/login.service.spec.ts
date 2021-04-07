import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login correctly', (done) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrF2Y7b__-2r4uN1DztDe0bgCc_4gCeYQ';
    const responseObject = {
      idToken: 'dfghj',
      email: 'test@example.com',
      refreshToken: 'dfghj',
      expiresIn: '2000',
      localId: '1',
      registered: true
    };

    let response = null;
    const mockResponse = {
      status: '200'
    };

    let email = "test@example.com";
    let password = '123456';

    service.logIn(email, password).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
        expect(mockResponse.status.toString()).toEqual('200');
        done();
      },
      (error: any) => {}
    );

    const requestWrapper = httpMock.expectOne({url: url});
    expect(requestWrapper.request.method).toEqual('POST');
    requestWrapper.flush(responseObject);
  });

  it('should perform signup correctly', (done) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrF2Y7b__-2r4uN1DztDe0bgCc_4gCeYQ';
    const responseObject = {
      idToken: 'dfghj',
      email: 'test@example.com',
      refreshToken: 'dfghj',
      expiresIn: '2000',
      localId: '1',
      registered: false
    };

    let response = null;
    const mockResponse = {
      status: '200'
    };

    let email = "test@example.com";
    let password = '123456';

    service.signUp(email, password).subscribe(
      (receivedResponse: any) => {
        response = receivedResponse;
        expect(mockResponse.status.toString()).toEqual('200');
        done();
      },
      (error: any) => {}
    );

    const requestWrapper = httpMock.expectOne({url: url});
    expect(requestWrapper.request.method).toEqual('POST');
    requestWrapper.flush(responseObject);
  });
});
