import {Component, OnInit} from '@angular/core';
import {User, WorkerStatus} from '../models/user';
import {OrderService} from '../services/orderService';
import {AuthenticationService} from '../services/authenticationService';
import {Order, DeliveryStatus} from '../models/order';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-order-list-user',
  templateUrl: './order-list-user.component.html',
  styleUrls: ['./order-list-user.component.scss']
})

export class OrderListUserComponent implements OnInit {
  currUser: User;
  orders: Order[];
  // details: boolean[];

  constructor(private orderService: OrderService, private authenticationService: AuthenticationService, private userService: UserService) {
    // this.details = [];
    this.updateOrder();
  }
  //find current user's orderlist
  updateOrder() {
    this.authenticationService.currentUser.subscribe(user => {
      this.currUser = user
    });
    this.orders = [];

    this.orderService.findOrderByUserId(this.currUser._id).subscribe(orders => {
      orders.forEach(order => {
        this.orders.push(order);
        // this.details.push(false);
      })
    });
  }

  // showDetails(i: number) {
  //   this.details[i] = !this.details[i];
  // }

  ngOnInit() {
  }
 //after confirmed order, status changed to confirmed
  confirmOrder(i: number) {
    let currOrder = this.orders[i];
    currOrder.status = DeliveryStatus.Completed;
    this.orderService.updateOrder(currOrder._id, currOrder);
    let dm = currOrder._deliveryMan;
    dm.status = WorkerStatus.FREE;
    this.userService.updateUser(dm._id, dm);
  }

}
