import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {Role, User} from "../models/user";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    const user = new User('user2', 'user3', Role.USER);
    userService.register(user);
  }

  ngOnInit() {

  }

}
