import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit {
  @Input() restaurant;
  address: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.restaurant)
    this.address = this.restaurant.streetAddress + ', ' + this.restaurant.city + ', '
      + this.restaurant.state + ' ' + this.restaurant.zip;
  }

}
