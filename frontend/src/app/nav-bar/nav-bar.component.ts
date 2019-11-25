import {Component, OnInit, Input, Output} from '@angular/core';
// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authenticationService";
import {User} from "../models/user";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  authenticationService: AuthenticationService;
  currentUser = null;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }

  ngOnInit() {
  }

}
