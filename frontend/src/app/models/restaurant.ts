import {User} from "./user";

export class Restaurant {
  _user: string; //ID
  name: string;
  address: string;
  food: any;
  foodType: string;
  city: string;
  state: string;
  phone: string;
  zip: string;
  url: string;

  constructor(_user: string, name: string, address: string, foodType: string,
              city: string, state: string, phone: string, zip: string) {
    this._user = _user;
    this.address = address;
    this.name = name;
    this.foodType = foodType;
    this.city = city;
    this.state = state;
    this.phone = phone;
    this.zip = zip;
    this.food = [];
  }
}

export class Food {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
