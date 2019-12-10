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
  currDelManId: string;
  orderStatus: DeliveryStatus

  constructor(orderService: OrderService, private dataTransfer: DataTransfer, private router: Router, authenticationService: AuthenticationService) { 
    this.orderService = orderService;
    
    this.authenticationService = authenticationService;
    this.currDelMan = this.authenticationService.currentUserValue;
    this.currDelManId = this.currDelMan._id;
    // show orders when this page be opened.
    this.getAllYourOrders();
  }

  // fins all orders belong to this delivery man.
  getAllYourOrders(){
    if(!this.currDelMan){
      this.currDelMan = this.authenticationService.currentUserValue;
    }
    this.yourOrders = new Array<Order>();
    this.currDelMan.orders.map(oid=>{
      //push each order into an array, for the table component in HTML.
     this.orderService.findOrderById(oid).subscribe(order=>{
      this.yourOrders.push(order);
     })
   })
    // this.orderService.findOrdersByDeliveryManId(this.currDelManId).subscribe(
    //   orderList=>{orderList.forEach(
    //     order=>{
    //       this.yourOrders.push(order);
    //     }
    //   )}
    // );
  }

  //pickup function for delivery man to change the status of each order.
  pickUp(order: Order){
    if(order.status == DeliveryStatus.Pickup){
      //new an order with the information from the old order, in order to update the order with original order id.
      let no = new Order(order._user, order.address, order.foods, order.creditCard, order.creditCardHolder, order.creditCardExpireDate, order.name, order.totalPrice, order.phone);
      no.status = DeliveryStatus.OnTheWay;
      this.orderService.updateOrder(order._id, no);
      this.getAllYourOrders();
      // this.orderService.updateOrder(this.orderId, no);
    }
  }

  ngOnInit() {
  }

}
