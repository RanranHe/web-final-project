import {Restaurant} from "./restaurant";
import {User} from "./user";

export enum Rate {
  BAD, POOR, AVERAGE, GOOD, EXCELLENT
}

export class Review {
  _user: User;
  restaurant: Restaurant;
  rate: Rate;
  text: string;
  url: string;
  size: string;
  dateCreated: Date;

  constructor(_user: User, restaurant: Restaurant, rate: Rate, text: string) {
    this._user = _user;
    this.restaurant = restaurant;
    this.rate = rate;
    this.text = text;
    this.dateCreated = new Date();
  }
}
