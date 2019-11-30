import {Component, OnInit, Input, Output} from '@angular/core';
// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  constructor(private router: Router) {
    
  }

  restaurantModification(){
    this.router.navigateByUrl("restaurant-search");
  }

  ngOnInit() {
  }

}
