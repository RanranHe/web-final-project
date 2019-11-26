import {Component, OnInit, Input, Output} from '@angular/core';
import {AuthenticationService} from "../services/authenticationService";
import {Role} from "../models/user";

// declare var showCart: any;

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  authenticationService: AuthenticationService;
  isLogin: boolean;
  currentUser = null;
  isCustomer = false;
  isDeliveryman = false;
  isManager = false;
  showCart = false;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        console.log(user);
        this.currentUser = user;
        this.isLogin = true;
        if (user.role === Role.DELIVERYMAN) {
          this.isDeliveryman = true;
          this.isCustomer = false;
          this.isManager = false;
        }
        if (user.role === Role.ADMIN) {
          this.isManager = true;
          this.isDeliveryman = false;
          this.isCustomer = false;
        }
        if (user.role === Role.CUSTOMER) {
          this.isManager = false;
          this.isDeliveryman = false;
          this.isCustomer = true;
        }
      } else {
        this.currentUser = null;
        this.isLogin = false;
      }
    });
  }

  show() {
    if (this.showCart) {
      this.showCart = false;
    } else {
      this.showCart = true;
    }
  }

  logout() {
    window.location.reload();
    this.authenticationService.logout();
  }

  ngOnInit() {

  }

}
