import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {Role, User} from "../models/user";

declare var signUpFormTextControl: any;
declare var signUpcheckValid: any;
declare var signUpExistUserAlert: any;

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  currentUser = null;
  alert = false;

  private itemForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.itemForm = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      pass1: new FormControl('', Validators.required)
    });
  }

  // if username and password are valid
  directToHomePage() {
    console.log("here")
    // in order to pass global value to a nested function
    const userService = this.userService;
    const email = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;

    // js validation, if pass or validations, then return true;
    // else return false;
    const result = signUpcheckValid();

    // search typed in email in database, in order to check whether it already exists.
    this.userService.findUserByEmail(email).subscribe(user => checkAndRegisterUser(user));

    // if the email already exists, show alert
    // else register this new user
    function checkAndRegisterUser(user) {
      if (user) {
        // call js effects
        signUpExistUserAlert();
      } else {
        if (result) {
          // creat new user and call userService
          const newUser = new User(email, pass, Role.CUSTOMER);
          userService.register(newUser);
        } else {
          return;
        }
      }
    }
    this.router.navigate(['login']);
  }


  ngOnInit() {
    // js effects
    signUpFormTextControl();
  }

}
