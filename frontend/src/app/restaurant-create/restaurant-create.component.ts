import { Component, OnInit } from '@angular/core';
import { RestaurantService } from "../services/restaurantService";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthenticationService } from "../services/authenticationService";
import { User } from '../models/user';
import { Restaurant, Food } from '../models/restaurant';
import { Observable } from 'rxjs';
import { DataTransfer } from "../services/dataTransfer";


@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent implements OnInit {
  restCreateForm: FormGroup;
  submitted = false;

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

  constructor(authenticationService: AuthenticationService, restaurantServeice: RestaurantService, private router: Router, 
    private datatransfer: DataTransfer, private formBuilder: FormBuilder) { 
    this.restaurantService = restaurantServeice;
    this.authenticationService = authenticationService;
    this.curUser = this.authenticationService.currentUserValue;
    this.curUserId = this.curUser._id;
  }

  // call this function to create a new restuarant.
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
    console.log("current_id:"+JSON.stringify(restNew));
    this.restaurantService.createRestaurant(restNew, this.curUser._id);
    this.cleanUp();

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.restCreateForm.invalid) {
        return;
    }else{
      this.createRestaurant();
      alert('RESTAURANT' + JSON.stringify(this.restCreateForm.controls['name'], null, 4) + 'CRESTED SUCCESS!! :-)\n\n');
    }

    // display form values on success
    
}

//clear up the input fields of new restaurant information.
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


// back to the main page 
  backToSearch(){
    this.router.navigateByUrl("restaurant-search");
  }

  //provide the validator to the input fields 
  ngOnInit() {
    this.restCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(5)]],
      url: ['', [Validators.required]]
    });
  }

  // apply validator
  get f() { return this.restCreateForm.controls; }

  onReset() {
    this.submitted = false;
    this.restCreateForm.reset();
  }
}
