import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../../services/cartService";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() menu: Array<any>;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  addToCart(name, price) {
    this.cartService.addToCart(name, price);
  }

}
