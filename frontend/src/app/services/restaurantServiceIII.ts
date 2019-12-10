import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

import {environment} from '../../environments/environment';
import {observable, Observable} from 'rxjs';
import {Restaurant} from "../models/restaurant";

@Injectable()
export class RestaurantServiceYelp {
  resourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/yelp`;
  }

  // implement eatstreet api to get restaurants by location
  findFoodByLocation(location) {
    const url = `${this.resourceURL}?location=${location}`;
    return this.http.get<Array<Restaurant>>(url);
  }

  // get menu of the restaurant
  findMenuByRestaurant(apiKey) {
    const url = `${this.resourceURL}/menu?apikey=${apiKey}`;
    return this.http.get<Array<any>>(url);
  }

  // find restaurant by apiKey
  findRestaurantByApiKey(apiKey) {
    const url = `${this.resourceURL}/restaurant?apikey=${apiKey}`;
    return this.http.get<Array<any>>(url);
  }

}
