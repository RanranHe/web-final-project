import {User} from "./user";

export class Restaurant {
  _user: User;
  name: string;
  address: string;
  food: Array<Food>;
  foodType: string;
  city: string;
  state: string;
  phone: string;
  zip: string;
  url: string;

  constructor(_user: User, name: string, address: string, foodType: string,
              city: string, state: string, phone: string, zip: string) {
    this._user = _user;
    this.address = address;
    this.name = name;
    this.foodType = foodType;
    this.city = city;
    this.state = state;
    this.phone = phone;
    this.zip = zip;
    this.food = Array<Food>();
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
