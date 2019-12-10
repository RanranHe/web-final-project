import {Component, OnInit, Input, Output} from '@angular/core';
import {CartService} from "../../services/cartService";
import {OrderService} from "../../services/orderService";
import {Order, DeliveryStatus} from '../../models/order';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authenticationService';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'checkout',
  templateUrl: './check-out.component.html',
  styleUrls: ['../cart.component.scss']
})

export class CheckOutComponent implements OnInit {
  foods: [];
  totalItemNum: number;
  totalPrice: any;
  shipping = 5;
  taxRate = 0.0625;
  tax: number;
  finalTotal: number;
  currUser: User;

  paymentForm: FormGroup;
  contactForm: FormGroup;
  alert = false;

  constructor(private carService: CartService, private orderService: OrderService, private authenticationService: AuthenticationService, private router: Router) {
    this.foods = this.carService.retrieveCart();
    this.totalItemNum = this.carService.retrieveTotalItemNum();
    this.totalPrice = this.carService.retrieveTotalPrice();
    this.tax = parseFloat((this.taxRate * this.totalPrice).toFixed(2));
    this.finalTotal = this.tax + parseFloat(this.totalPrice);
    this.authenticationService.currentUser.subscribe(user => {
      this.currUser = user
    });

    this.paymentForm = new FormGroup({
      creditCard: new FormControl('', Validators.required),
      creditCardHolder: new FormControl('', Validators.required),
      creditCardExpireDate: new FormControl('', Validators.required)
    });
    this.contactForm = new FormGroup({
      contactName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  generateOrder() {
    const creditCard = this.paymentForm.get("creditCard").value;
    const creditCardHolder = this.paymentForm.get("creditCardHolder").value;
    const expireDate = this.paymentForm.get("creditCardExpireDate").value.toString().substring(3, 15);

    const contactName = this.contactForm.get("contactName").value;
    const phone = this.contactForm.get("phone").value;
    const address = this.contactForm.get("address").value;

    if (creditCard && creditCardHolder && expireDate && contactName && phone && address) {
      let currOrder = new Order(this.currUser, address, this.foods, creditCard, creditCardHolder,
        expireDate, contactName, this.finalTotal, phone);
      currOrder.status = DeliveryStatus.Processing;
      // @ts-ignore
      const order = this.orderService.createOrder(currOrder, this.currUser._id);

      this.router.navigate(["orderList"]);
      this.carService.resetCart();
    } else {
      this.alert = true;
    }

  }

  ngOnInit() {

  }

}
