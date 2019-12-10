import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchComponent } from './restaurant-search.component';

import {FormsModule} from '@angular/forms';

describe('RestaurantSearchComponent', () => {
  let component: RestaurantSearchComponent;
  let fixture: ComponentFixture<RestaurantSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ RestaurantSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
