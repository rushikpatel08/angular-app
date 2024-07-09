import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListNgforComponent } from './customer-list-ngfor.component';

describe('CustomerListNgforComponent', () => {
  let component: CustomerListNgforComponent;
  let fixture: ComponentFixture<CustomerListNgforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListNgforComponent]
    });
    fixture = TestBed.createComponent(CustomerListNgforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
