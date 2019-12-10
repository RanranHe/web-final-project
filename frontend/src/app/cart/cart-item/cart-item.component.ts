import {Component, OnInit, Input, Output} from '@angular/core';
import {CartService} from "../../services/cartService";
import {Item} from "../../models/item";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
// include all cart items
export class CartItemComponent implements OnInit {
  @Input() item: Item;
  @Input() restaurantName: string;

  itemForm: FormGroup;
  quantity: number;

  constructor(private carService: CartService) {

  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      quantity: new FormControl('', Validators.required)
    });
    this.itemForm.patchValue({
      quantity: this.item.quantity
    });
  }
// show restaurant/item details
  modifyQuantity(restaurantName, item, itemForm) {

    const itemName = item.name;
    const previousNum = item.quantity;
    const newNum = itemForm.get('quantity').value;

    if (newNum === 0) {
      this.deleteItem(restaurantName, itemName);
      return;
    }
    if(newNum === " " || !newNum) {
      return;
    }
    if (newNum === item.quantity) {
      return;
    }

    this.carService.modifyQuantity(restaurantName, itemName, previousNum, newNum);
    window.location.reload();
  }

  deleteItem(restaurantName, itemName){
    this.carService.deleteItem(restaurantName, itemName);
    window.location.reload();
  }
}
