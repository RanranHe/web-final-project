import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RestaurantSearchResultsComponent} from './restaurant-search-results.component';

describe('RestaurantSearchResultsComponent', () => {
  let component: RestaurantSearchResultsComponent;
  let fixture: ComponentFixture<RestaurantSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantSearchResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
