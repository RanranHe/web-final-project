import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, observable, Observable, Subscription} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {UserService} from '../services/userService';
import {User} from '../models/user';
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  resourceURL: string;

<<<<<<< HEAD
  constructor(private http: HttpClient, private userService: UserService) {
    this.resourceURL = `${environment.serverBaseURL}/api/project`;
=======
  constructor(private http: HttpClient) {
    this.resourceURL = `${environment.serverBaseURL}/api/users`;
>>>>>>> c31f30e13bc7f7f79a4e1f31adbcc8f2a74d9032
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    
    this.currentUser = this.currentUserSubject.asObservable();
    this.userService = userService;
    if(this.currentUserSubject.value==null){
      let curr = new User("mmzz","mmzz","User");
      this.userService.register(curr).subscribe(user=>{
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    }
  }

  // get current login user info
  public get currentUserValue(): User {

      return this.currentUserSubject.value; 
    
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
      }
    }, catchError);
    return observable;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}