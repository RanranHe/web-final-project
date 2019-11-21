import {Order} from "./order";
import {Restaurant} from "./restaurant";
import {Review} from "./review";

export enum Role {
  USER = 'USER', DELIVERYMAN = 'DELIVERYMAN', MANAGER = 'MANAGER', ADMIN = 'ADMIN'
}

export enum WorkerStatus {
  FREE = 'FREE', BUSY = 'BUSY'
}

export class User {
  username: string;
  role: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  facebook: FaceBook;
  dateCreated: Date;
  // For users
  phone: string;
  orders: Array<Order>;
  // For managers
  income: Number;
  restaurants: Array<Restaurant>;
  // For DeliveryMan
  status: string;
  reviews: Array<Review>;

  constructor(username: string, password: string, role: string) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.dateCreated = new Date();
    this.orders = new Array<Order>();
    this.restaurants = new Array<Restaurant>();
    this.reviews = new Array<Review>();
    this.status = WorkerStatus.FREE;
  }
}

export class FaceBook {
  id: string;
  token: string;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}
