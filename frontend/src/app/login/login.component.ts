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
  currentUser = null;

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
    const email = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    this.authenticationService.login(email, pass);
    let check = 0;
    this.authenticationService.currentUser.subscribe(user => {
      console.log("user");
      console.log(user);

      removeLoginAlert();
      if (user !== null) {
        console.log(check+1);
        removeLoginAlert();
        this.router.navigate(['']);
        return;
      }
      if (user === null) {

        console.log(check+1);
        setLoginAlert();
        return;
      }
      removeLoginAlert();

      // else if (user === null) {
      //   console.log("hsere");
      //   console.log(user);
      //   setLoginAlert();
      //   return;
      // }
      // return;
    });
    console.log("hsere");
    // console.log(obs);
    // obs.subscribe(res => {
    //   if (res) {
    //     removeLoginAlert();
    //     this.router.navigate(['']);
    //     return;
    //   }
    // }, err => {
    //   catchError(setLoginAlert())
    // })
  }

  ngOnInit() {
    // js effects
    formTextControl();
  }

}
