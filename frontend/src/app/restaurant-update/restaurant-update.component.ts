import { Component, OnInit } from '@angular/core';
import { Restaurant, Food} from '../models/restaurant';
import { Observable } from 'rxjs';
import {DataTransfer} from "../services/dataTransfer";
import {Router} from '@angular/router';
import {RestaurantService} from "../services/restuarantService";

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
      // restTemp.subscribe(res => this.restName = res.name);
      // restTemp.subscribe(res => this.name = res.name);
      // restTemp.subscribe(res => this.foodType = res.foodType);
      // restTemp.subscribe(res => this.phone = res.phone);
      // restTemp.subscribe(res => this.address = res.address);
      // restTemp.subscribe(res => this.city = res.city);
      // restTemp.subscribe(res => this.state = res.state);
      // restTemp.subscribe(res => this.zip = res.zip);
      // restTemp.subscribe(res => this.uRL = res.url);
      // restTemp.subscribe(res => this.foods = res.food);
    }
  }

showUpdate(){
  // restTemp: Restaurant;
  //let res: Observable<Restaurant>;
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
