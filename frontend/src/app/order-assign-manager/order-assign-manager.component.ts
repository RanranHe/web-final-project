import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService'
import { User } from '../models/user';
import { DataTransfer } from "../services/dataTransfer";
import { OrderService } from '../services/orderService';
import { Order, DeliveryStatus } from '../models/order';

@Component({
  selector: 'app-order-assign-manager',
  templateUrl: './order-assign-manager.component.html',
  styleUrls: ['./order-assign-manager.component.scss']
})
export class OrderAssignManagerComponent implements OnInit {
  
  deliveryMan: User;
  userService: UserService;
  orderId: string = this.dataTransfer.getData();
  orderService: OrderService;
  newOrder: Order;
  deliveryStatus: DeliveryStatus.Pickup;

  constructor(userService: UserService, private dataTransfer: DataTransfer, orderService: OrderService) { 
    this.orderService = orderService;
    this.userService = userService;
    this.userService.findFreeDeliveryMan().subscribe(res => {
      this.deliveryMan = res;
    });
  }

  assignOrder(deliveryManId: string){
    this.deliveryMan.status = 'BUSY';
    this.userService.updateUser(deliveryManId, this.deliveryMan);
    this.orderService.findOrderById(this.orderId).subscribe(res => {
      this.newOrder = res;
      this.newOrder._deliveryMan = this.deliveryMan;
      this.newOrder.status = this.deliveryStatus;
      this.orderService.updateOrder(this.orderId, this.newOrder);
    })
  }

  ngOnInit() {
  }

}
