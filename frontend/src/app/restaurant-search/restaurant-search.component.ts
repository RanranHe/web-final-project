import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../services/restaurantService";
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authenticationService";
import { User } from '../models/user';
import { Restaurant, Food} from '../models/restaurant';
import { Observable } from 'rxjs';
import {DataTransfer} from "../services/dataTransfer";

declare var formTextControl: any;

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.scss']
})

export class RestaurantSearchComponent implements OnInit {

  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }

  restaurantService: RestaurantService;
  private itemForm: FormGroup;
  private itemFormUpdate: FormGroup;
  authenticationService: AuthenticationService;
  curUser: User; 
  curUserId: string;
  restaurants: Array<Restaurant>;

  constructor(authenticationService: AuthenticationService, restaurantServeice: RestaurantService, private router: Router, private datatransfer: DataTransfer) { 
    this.restaurantService = restaurantServeice;
    this.authenticationService = authenticationService;
    this.curUser = this.authenticationService.currentUserValue;
    this.curUserId = this.curUser._id;
    this.findRestaurantByUserId();
  }

  //  find all restaurants created by current admin user.
  findRestaurantByUserId(){
    this.restaurants = new Array<Restaurant>();
    this.restaurantService.findRestaurantByUserId(this.curUserId).subscribe(
      restList=>{restList.forEach(
        rest=>{
          this.restaurants.push(rest);
        }
      )}
    );
  }

  // delete the restaurant by id.
  deleteRestaurant(restaurantId){
    this.restaurantService.deleteRestaurant(restaurantId);
    this.findRestaurantByUserId();
  }

  ngOnInit() {
    formTextControl();
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
  }
  
  // four router function for all next steps.
  toCreate(){
    this.router.navigateByUrl("restaurant-create");
  }

  toUpdate(restId){
    this.datatransfer.setData(restId);
    this.router.navigateByUrl("restaurant-update");
  }

  toCheckOrders(){
    this.router.navigateByUrl("orderListManager");
  }

  toAddDeliveryMan(){
    this.router.navigateByUrl("adddeliveryman");
  }

}
