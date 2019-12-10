import { Component, OnInit } from '@angular/core';
import { Restaurant, Food} from '../models/restaurant';
import { Observable } from 'rxjs';
import {DataTransfer} from "../services/dataTransfer";
import {Router} from '@angular/router';
import {RestaurantService} from "../services/restaurantService";

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.scss']
})

export class RestaurantUpdateComponent implements OnInit {

  restID: string = this.dataTransfer.getData();
  restName: string;
  name: string;
  foodType : string;
  phone : string;
  address : string;
  city  : string;
  state : string;
  zip : string;
  uRL : string;
  foods : Array<Food>;
  newFoodName : string;
  newFoodPrice : string;
  restaurantService: RestaurantService;
  

  constructor(private dataTransfer:DataTransfer, private router:Router, restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
    if(this.restID){
      this.showUpdate();
    }
  }
// refresh the restaurant information after update.
showUpdate(){
  this.restaurantService.findRestaurantById(this.restID).subscribe(res=>{
    if(res){
      this.name = res["name"];
      this.restName = res["name"];
      this.phone = res["phone"];
      this.address = res["address"];
      this.city = res["city"];
      this.state = res["state"];
      this.zip = res["zip"];
      this.uRL = res["url"];
      this.foods = res["food"];
      this.foodType = res["foodType"];
    
    }
  })
  
  
  
}

// call this function to update the restaurant information
updateRestaurant(){
    let restTemp1: any = {};
    restTemp1.name = this.name;
    restTemp1.foodType = this.foodType;
    restTemp1.phone = this.phone;
    restTemp1.address = this.address;
    restTemp1.city = this.city;
    restTemp1.state = this.state;
    restTemp1.zip = this.zip;
    restTemp1.url = this.uRL;
    restTemp1.food = this.foods;
    this.restaurantService.updateRestaurant(this.restID, restTemp1).subscribe(res=>{
      this.showUpdate();
    }); 
    
  }

  // enrich the food menue of this restaurant.
  addFood(){
    let foodTemp: any = {};
    foodTemp.name = this.newFoodName;
    foodTemp.price = this.newFoodPrice;
    console.log("Restaurant ID: " + this.restID);
    console.log("New Food: " + "FoodName:" + foodTemp.name + "FoodPrice:" + foodTemp.price);
    this.restaurantService.insertFood(this.restID, foodTemp).subscribe((res)=>{
      this.showUpdate();
    })
    
  }

  

  backToSearch(){
    this.router.navigateByUrl("restaurant-search");
  }

  ngOnInit() {
  }

}
