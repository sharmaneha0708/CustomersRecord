import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;
  redirectUrl: string;
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  private userAuthChanged(status: boolean) {
    this.authChanged.emit(status);
 }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrF2Y7b__-2r4uN1DztDe0bgCc_4gCeYQ',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      map(responseData => {
        this.isAuthenticated = responseData.registered;
        this.userAuthChanged(responseData.registered);
        return responseData.registered;
    }),
      catchError(this.handleError)
    )
  }

  logIn(email: string, password: string) {
     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrF2Y7b__-2r4uN1DztDe0bgCc_4gCeYQ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        map(responseData => {
          this.isAuthenticated = responseData.registered;
          this.userAuthChanged(responseData.registered);
          return responseData.registered;
      }),
        catchError(this.handleError)
      )
    }


  private handleError(errorRes: HttpErrorResponse) {
    debugger;
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
