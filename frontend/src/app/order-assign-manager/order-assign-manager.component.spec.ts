import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAssignManagerComponent } from './order-assign-manager.component';

describe('OrderAssignManagerComponent', () => {
  let component: OrderAssignManagerComponent;
  let fixture: ComponentFixture<OrderAssignManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAssignManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAssignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
