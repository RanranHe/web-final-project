import {Component} from '@angular/core';
// import {Item} from './models/item';
// import {ItemService} from './services/item.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // itemsParent: Array<Item>;

  // constructor(itemService: ItemService) {
  //   // get all items
  //   const items$: Observable<Array<Item>> = itemService.getItems();
  //   items$.subscribe(items => {
  //     this.itemsParent = items;
  //   });
  // }
}
