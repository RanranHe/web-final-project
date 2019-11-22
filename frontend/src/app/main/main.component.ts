import {Component, OnInit, Input, Output} from '@angular/core';

// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authenticationService";
declare var threeD: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
  }

  ngOnInit() {
    threeD();
  }

}
