import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ItemService {

  itemResource: string;
  itemResourceURL: string;

  // Constructor
  constructor(private http: HttpClient) {
    this.itemResource = 'api';
    this.itemResourceURL = `${environment.serverBaseURL}/${this.itemResource}`;
  }

  // /**
  //  * Returns all items.
  //  *
  //  * @return {Observable<Array<Item>>} {Observable item array of items}
  //  */
  // getItems(): Observable<Array<Item>> {
  //   return this.http.get<Array<Item>>(`${this.itemResourceURL}/items`);
  // }
  //
  // /**
  //  * Creates new item.
  //  *
  //  * @param  {Item} item: Item {new item object}
  //  * @return {Observable<Item>} {Observable for saved sticky object}
  //  */
  // createItem(item: Item = null): Observable<Item> {
  //   let newItem: Item;
  //   newItem = item ? item : new Item('Untitled Item', '', new Date());
  //   return this.http.post<Item>(`${this.itemResourceURL}/item`, newItem);
  // }
  //
  // // update Item by ID
  // updateItem(id: string, title: string, content: string, modifiedDate: Date, dueDate: Date) {
  //   const observable = this.http.put<Item>(`${this.itemResourceURL}/item/${id}`,
  //     {title: title, content: content, modifiedDate: modifiedDate, dueDate: dueDate});
  //   observable.subscribe(res => { // get response
  //     console.log('Update Item');
  //     console.log(res);
  //   });
  // }
  //
  // updateStatus(id: string) {
  //   const observable = this.http.put<Item>(`${this.itemResourceURL}/item/${id}`,
  //     {status: 'Complete'});
  //   observable.subscribe(res => { // get response
  //     console.log('Update Status');
  //     console.log(res);
  //   });
  // }
  //
  // // delete item by id
  // deleteItem(id: string) {
  //   const observable = this.http.delete<Item>(`${this.itemResourceURL}/item/${id}`);
  //   observable.subscribe(res => { // get response
  //     console.log('Delete Item');
  //     console.log(res);
  //   });
  // }
}
