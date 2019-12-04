import {Injectable} from '@angular/core';

@Injectable()
export class CartService {
  cart = [];
  totalPrice = 0;

  // Constructor
  constructor() {

  }

  addToCart(name, price) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].name === name) {
        var singlePrice = this.cart[i].price / this.cart[i].quantity;
        this.cart[i].quantity += 1;
        this.cart[i].price += singlePrice;
        this.totalPrice += singlePrice;
        return;
      }
    }
    this.cart.push({
      name: name,
      quantity: 1,
      price: price
    });
    console.log(this.cart);
    this.totalPrice += price;
  }

  retrieveCart() {
    return this.cart;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
