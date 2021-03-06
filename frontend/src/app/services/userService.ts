import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

import {environment} from '../../environments/environment';
import {observable, Observable, Observer} from 'rxjs';

@Injectable()
export class UserService {
  resourceURL: string;
  resourceURLTemp: string;
  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/users`;
    this.resourceURLTemp = `${environment.serverBaseURL}/api/users/user`
  }
  // Register
  register(user: User = null): Observable<User> {
    const url = `${this.resourceURL}/register`;
    const observable = this.http.post<User>(url, {username: user.username, password: user.password, role: user.role, status: user.status});
    observable.subscribe(res => {
      console.log(res);
    })
    return observable;
  }

  // find user by email
  findUserByEmail(email: string) : Observable<User> {
    const url = `${this.resourceURL}/user?username=${email}`;
    return this.http.get<User>(url);
  }

  // find user by its id
  findUserById(userId: string) : Observable<User>{
    const url = this.resourceURLTemp + "/" + userId;
    const observable = this.http.get<User>(url);
    observable.subscribe(res => {
      console.log("res from service: " + res);
    })
    return observable;
  }

  // get all deliver man who are free
  findFreeDeliveryMan(): Observable<Array<User>>{
    const url = `${this.resourceURL}/deliveryMan/free`;
    const observable = this.http.get<Array<User>>(url);
    return observable;
  }

  // update user details
  updateUser(userId: string, newUser: User): Observable<User>{
    const url = `${this.resourceURL}/user/${userId}`;
    const observable = this.http.put<User>(url, newUser);
    return observable;
  }
}
