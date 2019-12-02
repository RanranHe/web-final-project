import {Component, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {RestaurantSearchResultsComponent} from "../restaurant-search-results.component";


@Component({
  selector: 'restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})

export class RestaurantListComponent implements OnInit {
  @Input() restaurants:Array<Restaurant>;
  @Input() restaurantSearchResultsComponent: RestaurantSearchResultsComponent;
  @Input() showMoreBtn: boolean;

  constructor() {
  }

  // once click the button, show some more restaurants.
  showMoreRestaurants() {
    this.restaurantSearchResultsComponent.showMore();
  }

  ngOnInit() {
  }

}
