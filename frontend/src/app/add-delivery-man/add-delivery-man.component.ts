import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {Role, User, WorkerStatus} from "../models/user";
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { ConsoleReporter } from 'jasmine';

declare var signUpFormTextControl: any;
declare var signUpcheckValid: any;
declare var signUpExistUserAlert: any;

@Component({
  selector: 'app-add-delivery-man',
  templateUrl: './add-delivery-man.component.html',
  styleUrls: ['./add-delivery-man.component.scss']
})

export class AddDeliveryManComponent implements OnInit {

  private itemForm: FormGroup;
  tempUser: any = {};

  constructor(private userService: UserService, private router: Router) {
    this.itemForm = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      pass1: new FormControl('', Validators.required)
    });
  }

  
  // if username and password are valid
  directToHomePage() {
    // in order to pass global value to a nested function
    // const userService = this.userService;
    
    const username = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    const newdel = new User(username, pass, Role.DELIVERYMAN);
    console.log(newdel);
    this.userService.register(newdel).subscribe(user=>{
      this.tempUser = user;
      console.log(this.tempUser);
    });
    // this.findUserByEmail(this.itemForm.get('email').value).subscribe(user=>{
    //   console.log(user);
    //   user.status =  WorkerStatus.FREE;
    //   this.tempUser.username = user.username;
    //   this.tempUser.password = user.password;
    //   this.tempUser.role = user.role;
    //   this.tempUser.status = WorkerStatus.FREE;
    //   console.log(this.tempUser);
    //   this.updateUser(user._id, this.tempUser);
    // });
    console.log(this.tempUser);
    
    // js validation, if pass or validations, then return true;
    // else return false;
    // const result = signUpcheckValid();

    // search typed in email in database, in order to check whether it already exists.
    // this.userService.findUserByEmail(email).subscribe(user => checkAndRegisterUser(user));

    // if the email already exists, show alert
    // else register this new user
    // function checkAndRegisterUser(user) {
    //   if (!user) {
      //   // call js effects
      //   signUpExistUserAlert();
      // } else {
      //   if (result) {
          // creat new delivery man and call userService
          
        // } else {
        //   return;
  }

  findUserByEmail(email: string){
    return this.userService.findUserByEmail(email);
  }
    // }
  updateUser(userId: string, tempUser: User){
    this.userService.updateUser(userId, tempUser);
  }
  
  backto(){
    this.router.navigateByUrl("restaurant-search");
  }

  ngOnInit() {
    // js effects
    signUpFormTextControl();
  }

}
