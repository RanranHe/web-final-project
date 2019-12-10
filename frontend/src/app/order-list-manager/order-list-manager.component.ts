import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orderService';
import { Order } from '../models/order';
import {DataTransfer} from "../services/dataTransfer";
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list-manager',
  templateUrl: './order-list-manager.component.html',
  styleUrls: ['./order-list-manager.component.scss']
})
export class OrderListManagerComponent implements OnInit {

  orderService: OrderService;
  order:Order;
  orders : Array<Order>;

  constructor(orderService: OrderService, private dataTransfer: DataTransfer, private router: Router) { 
    this.orderService = orderService;
    this.getAllOrders();
  }

  //find all orders with histocrical orders in the website 
  getAllOrders(){
    this.orders = new Array<Order>();
    this.orderService.getAllOrders().subscribe(
      orderList=>{orderList.forEach(
        order=>{
          this.orders.push(order);
        }
      )}
    );
  }

  // nevigate to the assign delivery man component for next step.
  assignToDeliveryMan(orderId: string){
    this.dataTransfer.setData(orderId);
    this.router.navigateByUrl("orderAssignManager");
  }

  ngOnInit() {
  }

}
