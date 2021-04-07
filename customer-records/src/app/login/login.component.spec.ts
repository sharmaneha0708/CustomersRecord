import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginService: LoginService;
  let loginFormEl: DebugElement;
  let email: HTMLInputElement;
  let password: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule , HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginFormEl = fixture.debugElement.query(By.css("form"));
    submitEl = fixture.debugElement.query(By.css('button'));
    email = fixture.nativeElement.querySelector('input[type=email]');
    password = fixture.nativeElement.querySelector('input[type=password]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check initially input fields are empty', () => {
    fixture.detectChanges();
    expect(email.value).toBe('');
    expect(password.value).toBe('');
  });


  xit('should test if submit button is disabled when the form is invalid -- Required fields are empty', () => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.loginForm.form.controls['email'].setValue(null);
      component.loginForm.form.controls['password'].setValue(null);
    })
    //fixture.detectChanges();
   expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('should test if submit button is disabled when the form is invalid -- Wrong length of password', () => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.loginForm.form.controls['email'].setValue("test@test.com");
      component.loginForm.form.controls['password'].setValue("1234");
    })
   expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

it('should test if submit button is enabled when the form is valid',() => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      component.loginForm.form.controls['email'].setValue("test@test.com");
      component.loginForm.form.controls['password'].setValue("123456789");
    })
   expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

it('Entering email and password calls Login Service logIn function when submit button is clicked in login mode', () => {
  loginService = TestBed.inject(LoginService);
  component.isLoginMode = true;
  let loginSpy = spyOn(loginService, 'logIn').and.callThrough();
  email.value = 'test@example.com';
  password.value = '123456';
  loginFormEl.triggerEventHandler('ngSubmit', null);
  expect(loginSpy).toHaveBeenCalledTimes(1);
});

it('Entering email and password calls Login Service signUp function when submit button is clicked in signup mode', () => {
  loginService = TestBed.inject(LoginService);
  component.isLoginMode = false;
  let loginSpy = spyOn(loginService, 'signUp').and.callThrough();
  email.value = 'test@example.com';
  password.value = '123456';
  loginFormEl.triggerEventHandler('ngSubmit', null);
  expect(loginSpy).toHaveBeenCalledTimes(1);
});
});
