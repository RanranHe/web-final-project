import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from '../services/userService'
import {Router} from '@angular/router';
import {Role, User, WorkerStatus} from "../models/user";
import { containsElement } from '@angular/animations/browser/src/render/shared';


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

  
  // use this function create new delivery man object.
  // for delivery man creation, three arguments are needed: username, password and role title.
  directToHomePage() {
    const username = this.itemForm.get('email').value;
    const pass = this.itemForm.get('pass').value;
    // new delivery man object created.
    const newdel = new User(username, pass, Role.DELIVERYMAN);
    console.log(newdel);
    //call register function from userService to post delivery man into DB.
    this.userService.register(newdel).subscribe(user=>{
      this.tempUser = user;
      console.log(this.tempUser);
    });
    console.log(this.tempUser);
  }

  
  findUserByEmail(email: string){
    return this.userService.findUserByEmail(email);
  }
    // }
  updateUser(userId: string, tempUser: User){
    this.userService.updateUser(userId, tempUser);
  }
  
  //use this function to nevigate back to admin main page after new delivery man has been created.
  backto(){
    this.router.navigateByUrl("restaurant-search");
  }

  ngOnInit() {
    // js effects
    signUpFormTextControl();
  }

}
