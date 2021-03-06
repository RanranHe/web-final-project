import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";

declare var loginFormTextControl: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userService: UserService;
  authenticationService: AuthenticationService;
  showNavBar = false;
  alert = false;

  itemForm: FormGroup;

  constructor(userService: UserService, authenticationService: AuthenticationService, private router: Router) {
    this.userService = userService;
    this.authenticationService = authenticationService;

    // email and password form
    this.itemForm = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  // if username and password are valid
  directToHomePage() {
    const email = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    const temp = this.authenticationService.login(email, pass);
    temp.subscribe(user => {
      console.log("user")
      this.alert = false;
      if (user) {
        this.authenticationService.setCurrentUser(user);
        this.router.navigate(['']);
      }
    }, err => {
      this.alert = true;
    })
  }

  ngOnInit() {
    // js effects
    loginFormTextControl();
  }

}
