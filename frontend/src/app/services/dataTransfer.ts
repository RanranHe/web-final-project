import { Injectable } from '@angular/core';
// an additional service for data transfer between different components. 

@Injectable()
export class DataTransfer {

  constructor() { }

  private data;

  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}