import Prepend from "./perpend";

export default class CopperWire extends Prepend {
  // This is not right, please do not use.
  getQuantity() {
    // The exception is normal ==> DO NOT USE !!
    const a: string | null = null;
    return super.getQuantity();
  }

  // Use this instead, the calculus is correct
  getWireQuantity() {
    let coil = Math.trunc(this.quantity / 50);
    let map = {
      wire: this.quantity % 50,
      coil: coil,
    };
    return map;
  }

  show() {
    console.log(
      " - " + this.getWireQuantity()["coil"] + " copper wire coils (50m)"
    );
    console.log(" - " + this.getWireQuantity()["wire"] + " copper wire meters");
  }
}
