import {Component, OnInit, Input, Output} from '@angular/core';
import {CartService} from "../services/cartService";
import {OrderService} from "../services/orderService";
import {Order, DeliveryStatus} from '../models/order';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authenticationService';
import {Router} from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  foods: [];
  totalItemNum: number;
  totalPrice: any;
  shipping = 5;
  taxRate = 0.0625;
  tax: number;
  finalTotal: number;


  constructor(private carService: CartService, private orderService: OrderService, private authenticationService: AuthenticationService, private router: Router) {
    this.foods = this.carService.retrieveCart();
    this.totalItemNum = this.carService.retrieveTotalItemNum();
    this.totalPrice = this.carService.retrieveTotalPrice();
    this.tax = parseFloat((this.taxRate * this.totalPrice).toFixed(2));
    this.finalTotal = this.tax + parseFloat(this.totalPrice);
  }

  resetCart() {
    this.carService.resetCart();
    window.location.reload();
  }

<<<<<<< HEAD
  generateOrder() {
    this.router.navigate(["checkout"]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
=======
  generateOrder(){
    console.log(this.creditCardExpireDate)
    let currOrder = new Order(this.currUser, this.address, this.foods, this.creditCard, this.creditCardHolder, "12/23/12", this.contactName, this.totalPrice, this.phone);
    currOrder.status = DeliveryStatus.Processing;
    const order = this.orderService.createOrder(currOrder, this.currUser._id)
    this.router.navigate(["orderList"]);
>>>>>>> updatee
  }

  ngOnInit() {

  }

}
