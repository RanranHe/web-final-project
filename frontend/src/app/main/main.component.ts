import {Component, OnInit, Input, Output} from '@angular/core';

// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authenticationService";
import {User} from "../models/user";
declare var threeD: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  authenticationService: AuthenticationService;
  currentUser: User;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    console.log(this.currentUser);
  }

  ngOnInit() {
    threeD();
  }

}
