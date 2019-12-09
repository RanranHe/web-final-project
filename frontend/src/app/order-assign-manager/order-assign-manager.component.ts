import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService'
import { User, WorkerStatus} from '../models/user';
import { DataTransfer } from "../services/dataTransfer";
import { OrderService } from '../services/orderService';
import { Order, DeliveryStatus } from '../models/order';
import {Router} from '@angular/router';

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
  deliveryMen: Array<User>;

  constructor(userService: UserService, private dataTransfer: DataTransfer, orderService: OrderService, private router:Router) { 
    this.orderService = orderService;
    this.userService = userService;
    this.findFreeDeliveryMen();
    // this.userService.findFreeDeliveryMan().subscribe(res => {
    //   this.deliveryMan = res;
    // });
  }

  findFreeDeliveryMen(){
    this.deliveryMen = new Array<User>();
    this.userService.findFreeDeliveryMan().subscribe(
      restList=>{restList.forEach(
        rest=>{
          this.deliveryMen.push(rest);
        }
      )}
    );
  }

  assignOrder(deliveryManId: string){
    let tmpMan:User;
    this.userService.findUserById(deliveryManId).subscribe(res =>{
        tmpMan = res;
    })
    tmpMan.status = WorkerStatus.BUSY;
    this.userService.updateUser(deliveryManId, tmpMan);
    this.orderService.findOrderById(this.orderId).subscribe(res => {
      this.newOrder = res;
      this.newOrder._deliveryMan = this.deliveryMan;
      this.newOrder.status = this.deliveryStatus;
      this.orderService.updateOrder(this.orderId, this.newOrder);
    })
    this.router.navigateByUrl("order-list-manager");
  }

  ngOnInit() {
  }

}
