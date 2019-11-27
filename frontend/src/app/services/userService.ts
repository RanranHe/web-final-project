import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

import {environment} from '../../environments/environment';
import {observable, Observable} from 'rxjs';

@Injectable()
export class UserService {
  resourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
  }

  // Register
  register(user: User = null) {
    const url = `${this.resourceURL}/register`;
    const observable = this.http.post<User>(url, {username: user.username, password: user.password, role: user.role});
    observable.subscribe(res => {
      console.log(res);
    })
  }

  // find user by email
  findUserByEmail(email: string) : Observable<User> {
    const url = `${this.resourceURL}/user?username=${email}`;
    return this.http.get<User>(url);
  }
}
