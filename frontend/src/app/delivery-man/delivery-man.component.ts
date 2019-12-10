import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orderService';
import { Order, DeliveryStatus} from '../models/order';
import {Router} from '@angular/router';
import { AuthenticationService } from '../services/authenticationService';
import { DataTransfer } from '../services/dataTransfer'
import { User } from '../models/user';


@Component({
  selector: 'app-delivery-man',
  templateUrl: './delivery-man.component.html',
  styleUrls: ['./delivery-man.component.scss']
})
export class DeliveryManComponent implements OnInit {
  
  orderService: OrderService;
  order:Order;
  yourOrders : Array<Order>;
  deliveryManId: string;
  authenticationService: AuthenticationService;
  currDelMan: User;
  currDelManId: string

  constructor(orderService: OrderService, private dataTransfer: DataTransfer, private router: Router, authenticationService: AuthenticationService) { 
    this.orderService = orderService;
    this.getAllYourOrders(); 
    this.authenticationService = authenticationService;
    this.currDelMan = this.authenticationService.currentUserValue;
    this.currDelManId = this.currDelMan._id
  }

  getAllYourOrders(){
    this.yourOrders = new Array<Order>();
    this.orderService.findOrdersByDeliveryManId(this.currDelManId).subscribe(
      orderList=>{orderList.forEach(
        order=>{
          this.yourOrders.push(order);
        }
      )}
    );
  }

  pickUp(order: Order){
    if(order.status === DeliveryStatus.Pickup){
      order.status = DeliveryStatus.OnTheWay;
      this.orderService.updateOrder(order._id, order);
    }
  }

  ngOnInit() {
  }

}
