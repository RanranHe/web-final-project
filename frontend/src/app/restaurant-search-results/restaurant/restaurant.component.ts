import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/userService'
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, ignoreElements} from "rxjs/operators";
import {RestaurantService} from "../../services/restuarantService";
import {Restaurant} from "../../models/restaurant";

declare var loginFormTextControl: any;

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit {
  @Input() restaurant;

  // @ts-ignore
  imageUrl: string;

  constructor() {
  }



  ngOnInit() {
    const list = ['https://static.eatstreet.com/assets/images/restaurant_logos/ali-baba-10302_1396633239188.png',
    'https://static.eatstreet.com/assets/images/restaurant_logos/ali-baba-10302_1396633239188.png'];
    this.imageUrl = this.restaurant.url;
    console.log("here")
  }

}
