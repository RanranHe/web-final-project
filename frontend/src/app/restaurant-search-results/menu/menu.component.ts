import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {RestaurantService} from "../../services/restaurantService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  apiKey: string;
  menu: Array<any>;

  constructor(private restaurantService: RestaurantService, private routeInfo: ActivatedRoute) {
    this.apiKey = this.routeInfo.snapshot.params.apikey;
    this.restaurantService.findMenuByRestaurant(this.apiKey).subscribe(data => {
      this.menu = data;
    })
  }

  ngOnInit() {

  }

}
