import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";

declare var formTextControl: any;
declare var setLoginAlert: any;
declare var removeLoginAlert: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userService: UserService;
  authenticationService: AuthenticationService;

  private itemForm: FormGroup;

  constructor(userService: UserService, authenticationService: AuthenticationService, private router: Router) {
    this.userService = userService;
    this.authenticationService = authenticationService;

    this.itemForm = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  // if username and password are valid
  directToHomePage() {
    const obs = this.login();
    console.log(obs);
    obs.subscribe(res => {
      if (res) {
        removeLoginAlert();
        this.router.navigate(['']);
        return;
      }
    }, err => {
      catchError(setLoginAlert())
    })
  }

  login() {
    const email = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    return this.authenticationService.login(email, pass);
  }

  ngOnInit() {
    // js effects
    formTextControl();
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
  }

}
