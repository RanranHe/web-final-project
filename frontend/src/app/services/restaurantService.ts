import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Restaurant, Food} from '../models/restaurant';
import {User} from "../models/user";

import {environment} from '../../environments/environment';
import {observable, Observable} from 'rxjs';

// service for restaurant modification.
@Injectable()
export class RestaurantService {
  resourceURL: string;
  yelpResourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
    this.yelpResourceURL = `${environment.serverBaseURL}/api/yelp`;
  }

  // Register
  createRestaurant(restaurant: Restaurant = null, userId: string) {
    const url = `${this.resourceURL}/user/${userId}/restaurant`;
    const observable = this.http.post<Restaurant>(url, restaurant);
    observable.subscribe(res => {
      console.log(res);
    })
  }

  // get restaurant by the apikey
  findRestaurantById(restaurantId: string): Observable<Restaurant>{
    const url = `${this.resourceURL}/restaurant/${restaurantId}`;
    const observable = this.http.get<Restaurant>(url);
    //let currRes: Restaurant;
    return observable;
  }

  // get restaurants under which user
  findRestaurantByUserId(userId: string): Observable<Array<Restaurant>>{
    const url = `${this.resourceURL}/user/${userId}/restaurant`;
    const observable = this.http.get<Array<Restaurant>>(url);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    return observable;
  }

  // update Restaurant details
  updateRestaurant(restaurantId:  string, newRestaurant: Restaurant): Observable<Restaurant>{
      const url = `${this.resourceURL}/restaurant/${restaurantId}`;
      const observable = this.http.put<Restaurant>(url, newRestaurant);
    //   observable.subscribe(res => {
    //     console.log(res);
    //     //return res;
    //   })
      return observable;
  }

  // delete restaurant
  deleteRestaurant(restaurantId: string){
    const url = `${this.resourceURL}/restaurant/${restaurantId}`;
    const observable = this.http.delete<Restaurant>(url);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    return observable;
  }

  // create item in menu
  insertFood(restaurantId: string, newFood: Food): Observable<Restaurant>{
    const url = `${this.resourceURL}/restaurant/insertFood/${restaurantId}`;
    const observable = this.http.put<Restaurant>(url, newFood);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    return observable;
  }

  // implement eatstreet api to get restaurants by location
  findFoodByLocation(location) {
    const url = `${this.yelpResourceURL}?location=${location}`;
    return this.http.get<Array<Restaurant>>(url);
  }

  // find restaurant by api key
  findRestaurantByApiKey(apiKey) {
    const url = `${this.yelpResourceURL}/restaurant?apikey=${apiKey}`;
    return this.http.get<Array<any>>(url);
  }

  // find menu by restaurant key
  findMenuByRestaurant(apiKey) {
    const url = `${this.yelpResourceURL}/menu?apikey=${apiKey}`;
    return this.http.get<Array<any>>(url);
  }
}
