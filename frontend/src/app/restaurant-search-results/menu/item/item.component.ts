import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../../services/cartService";
import {RestaurantService} from "../../../services/restaurantService";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() menu: Array<any>;
  @Input() apiKey: string;
  restaurantName: string;

  constructor(private cartService: CartService, private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.restaurantService.findRestaurantByApiKey(this.apiKey).subscribe(data => {
      // @ts-ignore
      this.restaurantName = data.restaurant.name;
    })
  }

  addToCart(name, price) {
    this.cartService.addToCart(this.restaurantName, name, price);
  }

}
