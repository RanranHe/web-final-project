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
  orderStatus: string;
  

  constructor(userService: UserService, private dataTransfer: DataTransfer, orderService: OrderService, private router:Router) { 
    this.orderService = orderService;
    this.userService = userService;
    this.findFreeDeliveryMen();
    // this.userService.findFreeDeliveryMan().subscribe(res => {
    //   this.deliveryMan = res;
    // });
  }

  // call this function to find all delivery men during the website.
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

//call this function to update the status of the delivery man from free to busy who been selected to handle this order.
// and make a record to the delivery man about this order.
  updateUser(deliveryMan: User, or_id:string){
    let tmpMan: any = {};
    console.log(or_id);
    deliveryMan.orders.push(or_id);
    
    tmpMan.id = deliveryMan._id;
    
    tmpMan.newUser = deliveryMan;
    
    // tmpMan.orders.push(or);
    this.userService.updateUser(deliveryMan._id, tmpMan).subscribe(delMan=>
     {
        console.log(delMan);
        
    });
  }

  // update delivery man work status from free to busy.
  assignOrder(deliveryMan: User){
    
    deliveryMan.status = WorkerStatus.BUSY;
    this.updateOrderStatus(deliveryMan);
    
  }

  // update the order status from prcoessing to pickup and assign the corresponding delivery man to this order.
  updateOrderStatus(deliveryMan: User) {
    let no: Order;
    this.orderService.findOrderById(this.orderId).subscribe(res=>{
      if(res){
        no = new Order(res._user, res.address, res.foods, res.creditCard, res.creditCardHolder, res.creditCardExpireDate, res.name, res.totalPrice, res.phone);
        if(res.status == DeliveryStatus.Processing){
          no.status = DeliveryStatus.Pickup;
          no._deliveryMan = deliveryMan;
        }
        this.orderService.updateOrder(this.orderId, no);
        this.updateUser(deliveryMan, res._id);
      }
    })
  }

  //back to the main page.
  back(){
    this.router.navigateByUrl("orderListManager");
  }

  ngOnInit() {
  }

}
