import {Component, OnInit, Output} from '@angular/core';
import {UserService} from '../services/userService'
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, ignoreElements} from "rxjs/operators";
import {RestaurantService} from "../services/restaurantService";
import {Restaurant} from "../models/restaurant";

declare var loginFormTextControl: any;

@Component({
  selector: 'search',
  templateUrl: './restaurant-search-results.component.html',
  styleUrls: ['./restaurant-search-results.component.scss']
})

export class RestaurantSearchResultsComponent implements OnInit {
  keyword: string;
  restaurants: Array<Restaurant>;

  constructor(private restaurantService: RestaurantService, private router: Router, private routeInfo: ActivatedRoute) {
    this.keyword = this.routeInfo.snapshot.params.key;

    this.restaurantService.findFoodByLocation(this.keyword).subscribe(data =>
      // @ts-ignore
      this.restaurants = Array.from(data.restaurants)
    );
  }

  getUrl(data: any){
    console.log(data);
  }

  ngOnInit() {
    console.log(this.restaurants);
  }

}
