import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../../models/restaurant";
import {RestaurantService} from "../../../services/restaurantService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() menu: Array<any>;

  constructor() {
  }

  ngOnInit() {

  }

}
