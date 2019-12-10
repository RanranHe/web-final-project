import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {AuthenticationService} from "./authenticationService";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

// to ensure the user can't access some url until log in.
export class AuthGuard implements CanActivate {
  loggedIn = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        // redirect to login page
        this.router.navigateByUrl('/login');
        this.loggedIn = false;
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {return this.loggedIn};
}
