import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {Role, User} from "../models/user";

declare var formTextControl: any;
declare var checkValid: any;
declare var removeAlerts: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userService: UserService;

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  directToHomePage() {
    if (checkValid()) {
      this.router.navigate(['']);
    } else {
      return;
    }
  }

  ngOnInit() {
    formTextControl();
  }

}
