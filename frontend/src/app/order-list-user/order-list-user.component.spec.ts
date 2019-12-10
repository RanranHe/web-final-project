import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListUserComponent } from './order-list-user.component';

describe('OrderListUserComponent', () => {
  let component: OrderListUserComponent;
  let fixture: ComponentFixture<OrderListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
