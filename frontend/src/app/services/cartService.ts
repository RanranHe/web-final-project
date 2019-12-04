import {Injectable} from '@angular/core';

@Injectable()
export class CartService {
  cart = [];
  totalPrice = 0;

  // Constructor
  constructor() {

  }

  addToCart(restaurantName, name, price) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].restaurantName === restaurantName) {
        for (var j = 0; j < this.cart[i].items.length; j++) {
          if (this.cart[i].items[j].name === name) {
            const singlePrice = this.cart[i].items[j].price / this.cart[i].items[j].quantity;
            this.cart[i].items[j].quantity += 1;
            this.cart[i].items[j].price += singlePrice;
            this.totalPrice += singlePrice;
            return;
          }
        }
        this.cart[i].items.push({
          name: name,
          quantity: 1,
          price: price
        });
        this.totalPrice += price;
        return;
      }
    }
    this.cart.push({
      restaurantName: restaurantName,
      items: [{
        name: name,
        quantity: 1,
        price: price
      }]
    });
    console.log(this.cart);
    this.totalPrice += price;
  }

  retrieveCart() {
    return this.cart;
  }

  retrieveTotalPrice() {
    return this.totalPrice;
  }
}
