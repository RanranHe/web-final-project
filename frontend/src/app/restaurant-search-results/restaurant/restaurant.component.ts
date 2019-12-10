import {Component, Input, OnInit} from '@angular/core';

import {UserService} from '../../services/userService'
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, ignoreElements} from "rxjs/operators";
import {RestaurantService} from "../../services/restaurantService";

import {Restaurant} from "../../models/restaurant";

declare var loginFormTextControl: any;


@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit {
  @Input() restaurant;
  address: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.restaurant)
    this.address = this.restaurant.streetAddress + ', ' + this.restaurant.city + ', '
      + this.restaurant.state + ' ' + this.restaurant.zip;
  }

  // go to menu page
  jumpToMenu(apikey: string) {
    this.router.navigate([`/restaurant/${apikey}/menu`])
  }
}
