export default class Prepend {
  public quantity: number;

  constructor() {
    this.quantity = 0;
  }
  getQuantity() {
    return this.quantity;
  }
  addQuantity(number) {
    this.quantity = this.quantity + number;
  }

  show() {
    console.log(" - " + this.quantity + " perpend palets");
  }
}
