export class Item {
  name: string;
  price: number;
  quantity: number;
  singlePrice: number;

  constructor(name: string, price: number, quantity: number, singlePrice: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.singlePrice = singlePrice;
  }
}
