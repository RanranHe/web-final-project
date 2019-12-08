import {Component, OnInit, Input, Output} from '@angular/core';
import {CartService} from "../services/cartService";
import {OrderService} from "../services/orderService";
import {Order} from '../models/order';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authenticationService';
import { Router } from '@angular/router';

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
  currOrder: Order;
  currUser: User;
  creditCard: Number;
  creditCardHolder: String;
  creditCardExpireDate: String;
  name: String;


  constructor(private carService: CartService, private orderService: OrderService, private authenticationService: AuthenticationService, private router: Router) {
    this.foods = this.carService.retrieveCart();
    this.totalItemNum = this.carService.retrieveTotalItemNum();
    this.totalPrice = this.carService.retrieveTotalPrice();
    this.tax = parseFloat((this.taxRate * this.totalPrice).toFixed(2));
    this.finalTotal = this.tax + parseFloat(this.totalPrice);
    this.authenticationService.currentUser.subscribe(user=>{
        this.currUser = user
    });
  }

  resetCart() {
    this.carService.resetCart();
    window.location.reload();
  }

  generateOrder(){
    console.log(this.currUser)
    let currOrder = new Order(this.currUser, "default add", this.foods, this.creditCard, this.creditCardHolder, this.creditCardExpireDate, "name", this.totalPrice, "phonenum");
    this.orderService.createOrder(currOrder, this.currUser._id)
    this.router.navigate(["orderList"]);
     
   
  }

  ngOnInit() {

  }

}
