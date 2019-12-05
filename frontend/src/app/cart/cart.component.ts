import {Component, OnInit, Input, Output} from '@angular/core';
import {CartService} from "../services/cartService";

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

  constructor(private carService: CartService) {
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

  ngOnInit() {

  }

}
