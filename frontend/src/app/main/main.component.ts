import {Component, OnInit, Input, Output} from '@angular/core';
import {AuthenticationService} from "../services/authenticationService";
import {User} from "../models/user";
import {Router} from "@angular/router";
declare var threeD: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    console.log(this.currentUser);
  }

  jumpToSearch(key: string) {
    this.router.navigate([`/list/${key}`]);
  }

  ngOnInit() {
    threeD();
  }

}
