import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantUpdateComponent } from './restaurant-update.component';

import {FormsModule} from '@angular/forms';


describe('RestaurantUpdateComponent', () => {
  let component: RestaurantUpdateComponent;
  let fixture: ComponentFixture<RestaurantUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ RestaurantUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
