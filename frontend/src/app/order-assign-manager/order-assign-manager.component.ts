import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService'
import { User, WorkerStatus} from '../models/user';
import { Review } from '../models/review';
import { DataTransfer } from "../services/dataTransfer";
import { OrderService } from '../services/orderService';
import { Order, DeliveryStatus } from '../models/order';
import {Router} from '@angular/router';
import { Restaurant } from '../models/restaurant';

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
  username: string;
  password: string;
  role: string;
  status: string;
  reviews: Array<Review>;
  restaurants: Array<Restaurant>;
  order: string;
  dMId: string;

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
          console.log("Delivery Man: " + JSON.stringify(rest));
          this.deliveryMen.push(rest);
        }
      )}
    );
  }

  assignOrder(deliveryMan: User){
    let tmpMan: any = {};
    deliveryMan.status = WorkerStatus.BUSY;;
    this.userService.updateUser(deliveryMan._id, deliveryMan).subscribe(delMan=>
     {
        console.log(delMan);
        
    });
      // tmpMan.username = this.username;
      // tmpMan.password = this.password;
      // tmpMan.role = this.role;
      // tmpMan.status = this.status;
      // tmpMan.reviews = this.reviews;
      // tmpMan.restaurants = this.restaurants;
      // tmpMan.order = this.order;

    //   this.userService.updateUser(this.dMId, tmpMan);
    // // tmpMan.status = WorkerStatus.BUSY;
    // // this.userService.updateUser(deliveryManId, tmpMan);
    // this.orderService.findOrderById(this.orderId).subscribe(res => {
    //   this.newOrder = res;
    //   this.newOrder._deliveryMan = this.deliveryMan;
    //   this.newOrder.status = this.deliveryStatus;
    //   this.orderService.updateOrder(this.orderId, this.newOrder);
    // })
    
  }
  back(){
    this.router.navigateByUrl("orderListManager");
  }

  ngOnInit() {
  }

}
