import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {Role, User, WorkerStatus} from "../models/user";

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
  tempUser: User;
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
    
    const email = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    const newdel = new User(email, pass, Role.DELIVERYMAN);
    this.userService.register(newdel);
    this.userService.findUserByEmail(email).subscribe(res=>{
      if(res){
        this.tempUser = res;
        this.tempUser.status = WorkerStatus.FREE;
        this.updateUser(this.tempUser._id, this.tempUser);
      }
    });
    
    this.router.navigateByUrl("restaurant-search");
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

    // }
  updateUser(userId: string, tempUser: User){
    this.userService.updateUser(userId, tempUser);
  }
  


  ngOnInit() {
    // js effects
    signUpFormTextControl();
  }

}
