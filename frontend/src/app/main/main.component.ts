import {Component, OnInit, Input, Output} from '@angular/core';

// import {Item} from '../models/item';
// import {ItemService} from '../services/item.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
declare var threeD: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    threeD();
  }

}
