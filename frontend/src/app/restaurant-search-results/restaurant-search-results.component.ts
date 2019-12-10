import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, ignoreElements} from "rxjs/operators";
import {RestaurantService} from "../services/restaurantService";

import {Restaurant} from "../models/restaurant";

@Component({
  selector: 'search',
  templateUrl: './restaurant-search-results.component.html',
  styleUrls: ['./restaurant-search-results.component.scss']
})

export class RestaurantSearchResultsComponent implements OnInit {
  @Output() restaurants: Array<Restaurant>;
  @Output() showMoreBtn = false;

  // search key word
  keyword: string;
  // default show restaurant size
  defaultShowRestSize = 12;
  // data received from api
  defaultShowRest: Array<Restaurant>;
  restRest: Array<Restaurant>;
  showMoreSize = 12;


  constructor(private restaurantService: RestaurantService, private router: Router, private routeInfo: ActivatedRoute) {
    // get the search key word form routing
    this.keyword = this.routeInfo.snapshot.params.key;
    // get data fit search key from api
    this.restaurantService.findFoodByLocation(this.keyword).subscribe(data =>
      // @ts-ignore
      this.setup(data)
    );
  }

  // split data to "show now' and "show later"
  setup(data) {
    this.restaurants = Array.from(data.restaurants);
    if (this.restaurants.length <= this.defaultShowRestSize) {
      this.showMoreBtn = false;
      this.defaultShowRest = this.restaurants;
    } else {
      this.showMoreBtn = true;
      this.defaultShowRest = this.restaurants.slice(0, this.defaultShowRestSize);
      this.restRest = this.restaurants.slice(this.defaultShowRestSize, this.restaurants.length);
    }
  }

  // Once the "show more" button is clicked
  showMore() {
    if (this.restRest.length <= this.showMoreSize) {
      this.showMoreBtn = false;
      this.defaultShowRest = this.restaurants;
    } else {
      this.showMoreBtn = true;
      this.defaultShowRest = this.defaultShowRest.concat(this.restRest.slice(0, this.showMoreSize));
      this.restRest = this.restRest.slice(this.showMoreSize, this.restRest.length);
    }
  }

  ngOnInit() {

  }

}
