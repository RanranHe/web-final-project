import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authenticationService";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare var formTextControl: any;
declare var checkValid: any;

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
  // TODO: link checkUserCredentials service
  directToHomePage() {
    const obs = this.login();
    obs.subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      }
    })
    // this.login().subscribe(res => {
    //   console.log(res);
    // });
    // console.log(this.authenticationService.isLoggedIn())

    // user.subscribe(res=>console.log(res))
    // console.log(user);
    // const currentUser = this.authenticationService.currentUserValue;
    // console.log(currentUser);
    // if (email === currentUser.username) {
    //   this.router.navigate(['']);
    // }
    // if (user) {
    //   this.router.navigate(['']);
    // }
    // // if (checkValid()) {
    // //   this.router.navigate(['']);
    // // } else {
    // //   return;
    // // }
    // this.login();
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
