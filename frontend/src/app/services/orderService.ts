import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Restaurant, Food} from '../models/restaurant';
import {User} from "../models/user";

import {environment} from '../../environments/environment';
import {observable, Observable} from 'rxjs';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
  resourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
  }

  createOrder(order: Order = null, userId: string):Observable<Order>{
    const url = `${this.resourceURL}/user/${userId}/order`;
    const obs = this.http.post<Order>(url, order);
    obs.subscribe(res => {
      console.log(res);
    });
    return obs;
  } 

  findOrderByUserId(userId: string): Observable<Array<Order>>{
      const url = `${this.resourceURL}/user/${userId}/order`;
      const observable = this.http.get<Array<Order>>(url);
      return observable;
  }

  findOrdersByDeliveryManId(deliveryManId: string): Observable<Array<Order>>{
      const url = `${this.resourceURL}/deliveryMan/${deliveryManId}/order`;
      const observable = this.http.get<Array<Order>>(url);
      return observable;
  }

  findOrderById(orderId: string): Observable<Order>{
    const url = `${this.resourceURL}/order/${orderId}`;
    const observable = this.http.get<Order>(url);
    return observable;
  }

  updateOrder(orderId: string, newOrder: Order): Observable<Order>{
    const url = `${this.resourceURL}/order/${orderId}`;
    const observable = this.http.put<Order>(url, newOrder);
    observable.subscribe(res=>{
      console.log(res);
    })
    return observable;
  }

  getAllOrders(): Observable<Array<Order>>{
    const url = `${this.resourceURL}/orders`;
    const observable = this.http.get<Array<Order>>(url);
    return observable;
  }
  
}
