import {Order} from "./order";

export enum Role {
  USER, DELIVERYMAN, MANAGER, ADMIN
}

export enum WorkerStatus {
  FREE, BUSY
}

export class User {
  username: string;
  role: Role;
  password: String;
  email: String;
  firstName: String;
  lastName: String;
  facebook: {
    id:    String,
    token: String
  };
  dateCreated: Date;
  // For users
  phone: String;
  orders: Array<Order>;
  // For managers
  income: Number;
  restaurants: Array<Restaurant>;
  // For DeliveryMan
  status: WorkerStatus;
  reviews: Array<String>;

  constructor(username: string, password: string, role: Role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.dateCreated = new Date();
    this.orders = new Array<Order>();
    this.restaurants = new Array<Restaurant>();
    this.reviews = new Array<String>();
    this.status = WorkerStatus.FREE;
  }
}
