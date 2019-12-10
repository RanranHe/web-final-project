import {Component, OnInit, Input, Output} from '@angular/core';
import {AuthenticationService} from "../services/authenticationService";
import {Role, User} from "../models/user";
import {Router} from "@angular/router";
import {CartService} from "../services/cartService";

// declare var showCart: any;

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  @Input() currentUser: User;

  isLogin: boolean;
  isCustomer = false;
  isDeliveryman = false;
  isManager = false;
  showCart = false;
  cart = null;
  totalPrice: any;
  totalItemNum = 0;

  constructor(private authenticationService: AuthenticationService, private router: Router, private cartService: CartService) {
    this.totalPrice = 0;
    // determine whether is logged in.
    this.authenticationService.currentUser.subscribe(user => {
      // determine the role of logged in user
      if (user) {
        this.currentUser = user;
        this.isLogin = true;
        if (user.role === Role.DELIVERYMAN) {
          this.isDeliveryman = true;
          this.isCustomer = false;
          this.isManager = false;
        }
        if (user.role === Role.ADMIN) {
          this.isManager = true;
          this.isDeliveryman = false;
          this.isCustomer = false;
        }
        if (user.role === Role.CUSTOMER) {
          this.isManager = false;
          this.isDeliveryman = false;
          this.isCustomer = true;
        }
      } else {
        this.currentUser = null;
        this.isLogin = false;
        this.isManager = false;
        this.isDeliveryman = false;
        this.isCustomer = false;
      }
    });
  }

  // control whether show cart details.
  show() {
    if (this.showCart) {
      this.showCart = false;
    } else {
      // retrieve car info from cart service cookie
      this.cart = this.cartService.retrieveCart();
      this.totalPrice = this.cartService.retrieveTotalPrice();
      this.totalItemNum = this.cartService.retrieveTotalItemNum();
      this.showCart = true;
    }
  }

  // clean local Storage and reset nav bar info
  logout() {
    this.authenticationService.logout();
    this.isLogin = false;
    this.isCustomer = false;
    this.isDeliveryman = false;
    this.isManager = false;
  }

  // link to cart component
  jumpToCart() {
    this.router.navigate(['/cart'])
  }

  // go to restaurant search page
  restaurantModification(){
    this.router.navigateByUrl("restaurant-search");
  }

  // go to delivery man work area
  deliveryManEntry(){
    this.router.navigateByUrl("deliveryman");
  }

  // check the user role
  checkUser(r: String):boolean{
    if(this.currentUser){
      return this.currentUser.role == r;
    }
    return false;
   
  }

  ngOnInit() {

  }

}
