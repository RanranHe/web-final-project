import {Component, OnInit, Input, Output} from '@angular/core';
import {AuthenticationService} from "../services/authenticationService";
import {User} from "../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare var profileFormTextControl: any;

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  currentUser: User;

  private itemForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) {
    this.itemForm = new FormGroup({
      email: new FormControl('', Validators.required),
      first: new FormControl('', Validators.required),
      last: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {
    if (this.currentUser !== null) {
      let email = '';
      let first = '';
      let last = '';
      let phone = '';
      if (this.currentUser.username) {
        email = this.currentUser.username;
      }
      if (this.currentUser.firstName) {
        first = this.currentUser.firstName;
      }
      if (this.currentUser.lastName) {
        last = this.currentUser.lastName;
      }
      if (this.currentUser.phone) {
        phone = this.currentUser.phone;
      }

      this.itemForm.patchValue({
        email: email,
        first: first,
        last: last,
        phone: phone
      });

      Object.keys(this.itemForm.controls).forEach(attr => {
        if(this.itemForm.get(`${attr}`).value !== '') {
          document.getElementById(`${attr}`).classList.add('has-val');
        } else {
          document.getElementById(`${attr}`).classList.remove('has-val');
        }
      })
    }

    profileFormTextControl();
  }

}
