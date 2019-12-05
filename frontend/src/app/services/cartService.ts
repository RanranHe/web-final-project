import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "./authenticationService";

@Injectable()
export class CartService {
  username: string;

  // Constructor
  constructor(private cookieService: CookieService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = null;
      }
    })
  }

  // add a item into cart
  addToCart(restaurantName, name, price) {
    // if the cookie exist
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      // get data from cookie
      const totalPrice = JSON.parse(this.cookieService.get(`${this.username}`)).totalPrice;
      const totalItemNum = JSON.parse(this.cookieService.get(`${this.username}`)).totalItemNum;
      const currentFoods = Array.from(JSON.parse(this.cookieService.get(`${this.username}`)).foods);
      // if the restaurant already in the cart, then:
      //      determine whether the item already exists
      //            if exists, update price and quantity
      //            else, populate a new item under this restaurant
      // else populate a new restaurant info with the given item
      for (var i = 0; i < currentFoods.length; i++) {
        // @ts-ignore
        if (currentFoods[i].restaurantName === restaurantName) {
          // @ts-ignore
          for (var j = 0; j < currentFoods[i].items.length; j++) {
            // @ts-ignore
            if (currentFoods[i].items[j].name === name) {
              // @ts-ignore
              currentFoods[i].items[j].quantity += 1;
              // @ts-ignore
              currentFoods[i].items[j].price = (parseFloat(currentFoods[i].items[j].price) + price).toFixed(2);
              const cart = {
                foods: currentFoods,
                totalPrice: totalPrice + price,
                totalItemNum: totalItemNum + 1
              };
              this.cookieService.set(`${this.username}`, JSON.stringify(cart));
              return;
            }
          }
          // @ts-ignore
          currentFoods[i].items.push({
            name: name,
            singlePrice: price,
            price: price,
            quantity: 1
          });
          const cart = {
            foods: currentFoods,
            totalPrice: totalPrice + price,
            totalItemNum: totalItemNum + 1
          };
          this.cookieService.set(`${this.username}`, JSON.stringify(cart));
          return;
        }
      }
      currentFoods.push({
        restaurantName: restaurantName,
        items: [{
          name: name,
          singlePrice: price,
          price: price,
          quantity: 1
        }]
      });
      const cart = {
        foods: currentFoods,
        totalPrice: totalPrice + price,
        totalItemNum: totalItemNum + 1
      };
      this.cookieService.set(`${this.username}`, JSON.stringify(cart));
    } else { // if the cookie doesn't exist, create a new one with the given item
      const cart = {
        foods:
          [{
            restaurantName: restaurantName,
            items: [{
              name: name,
              singlePrice: price,
              price: price,
              quantity: 1
            }]
          }],
        totalPrice: price,
        totalItemNum: 1
      };
      this.cookieService.set(`${this.username}`, JSON.stringify(cart));
    }
  }

  // get foods in the cart
  retrieveCart() {
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      return JSON.parse(this.cookieService.get(`${this.username}`)).foods;
    } else {
      return [];
    }
  }

  // get total price of the cart
  retrieveTotalPrice() {
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      return parseFloat(JSON.parse(this.cookieService.get(`${this.username}`)).totalPrice).toFixed(2);
    } else {
      return 0;
    }
  }

  // get total number of items in the cart
  retrieveTotalItemNum() {
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      return JSON.parse(this.cookieService.get(`${this.username}`)).totalItemNum;
    } else {
      return 0;
    }
  }

  resetCart() {
    this.cookieService.set(`${this.username}`, " ");
  }

  deleteItem(restaurantName, itemName) {
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      const totalPrice = JSON.parse(this.cookieService.get(`${this.username}`)).totalPrice;
      const totalItemNum = JSON.parse(this.cookieService.get(`${this.username}`)).totalItemNum;
      const currentFoods = Array.from(JSON.parse(this.cookieService.get(`${this.username}`)).foods);

      for (var i = 0; i < currentFoods.length; i++) {
        // @ts-ignore
        if (currentFoods[i].restaurantName === restaurantName) {
          // @ts-ignore
          for (var j = 0; j < currentFoods[i].items.length; j++) {
            // @ts-ignore
            if (currentFoods[i].items[j].name === itemName) {
              // @ts-ignore
              const deletePrice = parseFloat(currentFoods[i].items[j].price);
              // @ts-ignore
              const deleteQuantity = currentFoods[i].items[j].quantity;
              const cart = {
                foods: currentFoods,
                totalPrice: parseFloat(totalPrice) - deletePrice,
                totalItemNum: totalItemNum - deleteQuantity
              };
              // @ts-ignore
              if (currentFoods[i].items.length > 1) {
                // @ts-ignore
                currentFoods[i].items.splice(j, 1);
              } else {
                currentFoods.splice(i, 1);
              }

              this.cookieService.set(`${this.username}`, JSON.stringify(cart));
              return;
            }
          }
        }
      }
    }
  }

  modifyQuantity(restaurantName, itemName, previousQuantity, newQuantity) {
    if (this.cookieService.get(`${this.username}`) !== " " && this.cookieService.get(`${this.username}`)) {
      const totalPrice = JSON.parse(this.cookieService.get(`${this.username}`)).totalPrice;
      const totalItemNum = JSON.parse(this.cookieService.get(`${this.username}`)).totalItemNum;
      const currentFoods = Array.from(JSON.parse(this.cookieService.get(`${this.username}`)).foods);

      for (var i = 0; i < currentFoods.length; i++) {
        // @ts-ignore
        if (currentFoods[i].restaurantName === restaurantName) {
          // @ts-ignore
          for (var j = 0; j < currentFoods[i].items.length; j++) {
            // @ts-ignore
            if (currentFoods[i].items[j].name === itemName) {
              // @ts-ignore
              currentFoods[i].items[j].quantity = newQuantity;
              // @ts-ignore
              const deletePrice = parseFloat(currentFoods[i].items[j].price);
              // @ts-ignore
              const newPrice = (parseFloat(currentFoods[i].items[j].singlePrice) * newQuantity).toFixed(2);
              // @ts-ignore
              currentFoods[i].items[j].price = newPrice;
              const cart = {
                foods: currentFoods,
                totalPrice: parseFloat(totalPrice) - deletePrice + parseFloat(newPrice),
                totalItemNum: totalItemNum - previousQuantity + newQuantity
              };
              this.cookieService.set(`${this.username}`, JSON.stringify(cart));
              return;
            }
          }
        }
      }
    }
  }
}
