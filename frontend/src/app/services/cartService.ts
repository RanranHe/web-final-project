import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class CartService {

  // Constructor
  constructor(private cookieService: CookieService) {
    cookieService.set('totalPrice', '0');

  }

  addToCart(restaurantName, name, price) {
    if (this.cookieService.get('cart')) {
      const totalPrice = JSON.parse(this.cookieService.get('cart')).totalPrice;
      const totalItemNum = JSON.parse(this.cookieService.get('cart')).totalItemNum;
      const currentFoods = Array.from(JSON.parse(this.cookieService.get('cart')).foods);
      for (var i = 0; i < currentFoods.length; i++) {
        // @ts-ignore
        if (currentFoods[i].restaurantName === restaurantName) {
          // @ts-ignore
          for (var j = 0; j < currentFoods[i].items.length; j++) {
            // @ts-ignore
            if (currentFoods[i].items[j].name === name) {
              // @ts-ignore
              const singlePrice = currentFoods[i].items[j].price / currentFoods[i].items[j].quantity;
              // @ts-ignore
              currentFoods[i].items[j].quantity += 1;
              // @ts-ignore
              currentFoods[i].items[j].price += price;
              const cart = {
                foods: currentFoods,
                totalPrice: totalPrice+singlePrice,
                totalItemNum: totalItemNum+1
              };
              this.cookieService.set('cart', JSON.stringify(cart));
              return;
            }
          }
          // @ts-ignore
          currentFoods[i].items.push({
            name: name,
            quantity: 1,
            price: price
          });
          const cart = {
            foods: currentFoods,
            totalPrice: totalPrice+price,
            totalItemNum: totalItemNum+1
          };
          this.cookieService.set('cart', JSON.stringify(cart));
          return;
        }
      }
      currentFoods.push({
        restaurantName: restaurantName,
        items: [{
          name: name,
          quantity: 1,
          price: price
        }]
      });
      const cart = {
        foods: currentFoods,
        totalPrice: totalPrice+price,
        totalItemNum: totalItemNum+1
      };
      this.cookieService.set('cart', JSON.stringify(cart));
    } else {
      console.log("catch");
      const cart = {
        foods:
          [{
            restaurantName: restaurantName,
            items: [{
              name: name,
              price: price,
              quantity: 1
            }]
          }],
        totalPrice: price,
        totalItemNum: 1
      };
      this.cookieService.set('cart', JSON.stringify(cart));
    }
  }

  retrieveCart() {
    console.log(this.cookieService.get('cart'))
    if (this.cookieService.get('cart')) {
      return JSON.parse(this.cookieService.get('cart')).foods;
    } else {
      return [];
    }
  }

  retrieveTotalPrice() {
    if (this.cookieService.get('cart')) {
      return JSON.parse(this.cookieService.get('cart')).totalPrice.toFixed(2);
    } else {
      return 0;
    }
  }

  retrieveTotalItemNum() {
    if (this.cookieService.get('cart')) {
      return JSON.parse(this.cookieService.get('cart')).totalItemNum;
    } else {
      return 0;
    }
  }
}
