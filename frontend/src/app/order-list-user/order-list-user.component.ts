import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { User } from '../models/user';
import { OrderService } from '../services/orderService';
import {AuthenticationService} from '../services/authenticationService';
import {Order} from '../models/order';

@Component({
  selector: 'app-order-list-user',
  templateUrl: './order-list-user.component.html',
  styleUrls: ['./order-list-user.component.scss']
})
export class OrderListUserComponent implements OnInit {
  currUser: User;
  orders: Order[];
  constructor(private orderService: OrderService, private authenticationService: AuthenticationService) {
    this.updateOrder();
  }

  updateOrder(){
    this.authenticationService.currentUser.subscribe(user=>{
      this.currUser = user
  });
  this.orders = [];
  this.orderService.findOrderByUserId(this.currUser._id).subscribe(orders=>{
    orders.forEach(order=>{
      this.orders.push(order)
    })
  });
  }

  ngOnInit() {
    
  }

}
