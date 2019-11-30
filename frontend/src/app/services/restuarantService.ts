import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Restaurant, Food} from '../models/restaurant';
import {User} from "../models/user";

import {environment} from '../../environments/environment';
import {observable, Observable} from 'rxjs';

@Injectable()
export class RestaurantService {
  resourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
  }

  // Register
  createRestaurant(restaurant: Restaurant = null, userId: string) {
    const url = `${this.resourceURL}/user/${userId}/restaurant`;
    const observable = this.http.post<Restaurant>(url, restaurant);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
  }

  findRestaurantById(restaurantId: string): Observable<Restaurant>{
    const url = `${this.resourceURL}/restaurant/${restaurantId}`;
    const observable = this.http.get<Restaurant>(url);
    //let currRes: Restaurant;
    return observable;
  }

  findRestaurantByUserId(userId: string): Observable<Array<Restaurant>>{
    const url = `${this.resourceURL}/user/${userId}/restaurant`;
    const observable = this.http.get<Array<Restaurant>>(url);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    return observable;
  }

  updateRestaurant(restaurantId:  string, newRestaurant: Restaurant): Observable<Restaurant>{
      const url = `${this.resourceURL}/restaurant/${restaurantId}`;
      const observable = this.http.put<Restaurant>(url, newRestaurant);
    //   observable.subscribe(res => {
    //     console.log(res);
    //     //return res;
    //   })
      return observable;
  }

  deleteRestaurant(restaurantId: string){
    const url = `${this.resourceURL}/restaurant/${restaurantId}`;
    const observable = this.http.delete<Restaurant>(url);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    // return observable;
  }

  insertFood(restaurantId: string, newFood: Food): Observable<Restaurant>{
    const url = `${this.resourceURL}/restaurant/insertFood/${restaurantId}`;
    const observable = this.http.put<Restaurant>(url, newFood);
    // observable.subscribe(res => {
    //   console.log(res);
    // })
    return observable;
  }
}