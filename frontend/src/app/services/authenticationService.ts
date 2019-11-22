import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, observable, Observable, Subscription} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

import {User} from '../models/user';
import {environment} from "../../environments/environment";
import {error} from "selenium-webdriver";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  resourceURL: string;
  user: any;

  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // get current login user info
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get loggedData(): any {
    return this.user;
  }

  // Login service
  login(username: string, password: string) {
    const url = `${this.resourceURL}/login`;
    const observable = this.http.post<any>(url, {username, password});
    observable.subscribe(user => {
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return this.user = JSON.stringify(user);
      }
    });
    return observable;

    // console.log(this.user);
    // return observable.pipe(
    //   // retry(3),
    //   map(user => {
    //     if (user) {
    //       console.log(user);
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //       this.user = JSON.stringify(user);
    //     }
    //   }));
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
