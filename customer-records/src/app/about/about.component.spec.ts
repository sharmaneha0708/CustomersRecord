import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page name', () => {
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('About');
  })

  it('should display the created by name', () => {
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.col-md-10'));
		const el: HTMLElement = de.nativeElement;
		expect(el.innerText).toContain('Neha Sharma');
  })
});
