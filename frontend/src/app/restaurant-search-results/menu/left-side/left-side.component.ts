import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../../models/restaurant";
import {RestaurantService} from "../../../services/restaurantService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {
  @Input() menu: Array<any>;

  constructor() {

  }

  // scroll to each food category
  scroll(name:string) {
    const el = document.getElementById(`${name}`);
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit() {

  }

}
