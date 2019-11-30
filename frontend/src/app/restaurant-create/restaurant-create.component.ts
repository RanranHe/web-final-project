import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../services/restuarantService";
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authenticationService";
import { User } from '../models/user';
import { Restaurant, Food} from '../models/restaurant';
import { Observable } from 'rxjs';
import {DataTransfer} from "../services/dataTransfer";


@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent implements OnInit {

  restaurantService: RestaurantService;
  private itemForm: FormGroup;
  private itemFormUpdate: FormGroup;
  authenticationService: AuthenticationService;
  curUser: User; 
  curUserId: string;
  restaurants: Array<Restaurant>;
  newRest: Restaurant;

  name: string;
  foodType : string;
  phone : string;
  address : string;
  city  : string;
  state : string;
  zip : string;
  uRL : string;

  constructor(authenticationService: AuthenticationService, restaurantServeice: RestaurantService, private router: Router, private datatransfer: DataTransfer) { 
    this.restaurantService = restaurantServeice;
    this.authenticationService = authenticationService;
    this.curUser = this.authenticationService.currentUserValue;
    this.curUserId = this.curUser._id;
  }

  createRestaurant(){
    let foods = new Array<Food>();
    let restNew:any = {};
    restNew._user = this.curUser._id;
    restNew.name = this.name;
    restNew.address = this.address;
    restNew.city = this.city;
    restNew.state = this.state;
    restNew.zip = this.zip;
    restNew.foodType = this.foodType;
    restNew.phone = this.phone;
    restNew.url = this.uRL;
    restNew.food = foods;
    console.log("current_id:"+this.curUser._id);
    console.log("current_id:"+restNew);
    this.restaurantService.createRestaurant(restNew, this.curUser._id);
    this.cleanUp();

  }

  cleanUp(){
    this.name = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zip = "";
    this.foodType = "";
    this.phone = "";
    this.uRL = "";
  }

  backToSearch(){
    this.router.navigateByUrl("restaurant-search");
  }

  ngOnInit() {
  }

}
