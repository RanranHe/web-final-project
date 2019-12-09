import {User} from "./user";
import {Item} from "./item";

export enum DeliveryStatus {
  Processing, Pickup, OnTheWay, Cancelled, Completed
}

export class Order {
  _id:string;
  _deliveryMan: User;
  _user: User;
  address: string;
  foods: Array<Item>;
  creditCard: Number;
  creditCardHolder: String;
  creditCardExpireDate: String;
  name: String;
  totalPrice: Number;
  phone: String;
  date: Date;
  status: DeliveryStatus;

  constructor(_user: User, address: string, foods: Array<Item>, creditCard: Number, creditCardHolder: String,
              creditCardExpireDate: String, name: String, totalPrice: Number, phone: String) {
    this._user = _user;
    this.address = address;
    this.foods = foods;
    this.creditCard = creditCard;
    this.creditCardHolder = creditCardHolder;
    this.creditCardExpireDate = creditCardExpireDate;
    this.name = name;
    this.totalPrice = totalPrice;
    this.phone = phone;
    this.date = new Date();
    this.status = DeliveryStatus.Processing;
  }
}
