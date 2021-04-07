import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerComponent } from './customer.component';
class DummyComponent {}

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'settings/:collection/edit/:item',
            component: DummyComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render details', () => {
    let href = fixture.debugElement
      .query(By.css('a'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/details');
  });

  it('should have 2 number anchor', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelectorAll('.anchor_style').length).toEqual(2);
  });
});
