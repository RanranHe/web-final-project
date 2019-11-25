import {Component, OnInit, Input, Output} from '@angular/core';
import {AuthenticationService} from "../services/authenticationService";

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
  showCart = false;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLogin = true;
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
    this.authenticationService.logout();
    window.location.reload();
  }

  ngOnInit() {
  }

}
