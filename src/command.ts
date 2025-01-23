import moment from "moment";
import {v1 as uuidV1} from "uuid";
import CopperWire from "./copper-wire";
import Prepend from "./perpend";

export default class Command {
  public prepend: Prepend;
  public copperWire: Prepend;

  constructor() {
    this.prepend = new Prepend();
    this.copperWire = new CopperWire();
  }

  addPrepend(quantity) {
    this.prepend.addQuantity(quantity);
  }

  show() {
    console.log("\nThe order contains:\n");
    this.prepend.show();
    this.copperWire.show();
  }

  save() {
    const id = uuidV1();
    let header =
      "id; Date;Perpend Palets;Copper Wire Coils;Copper Wire Meters;";
    let jour = moment().format("YYYY-MM-DD");
    const File_Name = "./" + jour + "-orders.csv";

    let fs = require("fs");

    let append = fs.existsSync(File_Name)
    let file = fs.openSync(File_Name, "a");

    try {
      if (!append) {
        //Write the CSV file header
        fs.appendFileSync(file, header);
        //Add a new line separator after the header
        fs.appendFileSync(file, "\n");
      }

      //Write a the order to the CSV file
      fs.appendFileSync(file, id);
      fs.appendFileSync(file, ";");
      fs.appendFileSync(file, jour);
      fs.appendFileSync(file, ";");
      fs.appendFileSync(file, this.prepend.getQuantity().toString());
      fs.appendFileSync(file, ";");
      fs.appendFileSync(file, (<CopperWire>this.copperWire).getWireQuantity()["coil"].toString());
      fs.appendFileSync(file, ";");
      fs.appendFileSync(file, (<CopperWire>this.copperWire).getWireQuantity()["wire"].toString());
      fs.appendFileSync(file, "\n");
    } catch (e) {
      console.error(e);
    } finally {
      try {
        console.log("Order Saved");
        fs.closeSync(file);
      } catch (e) {
        console.log("Error !!!");
        console.log(e);
      }
    }
  }
  addCopperWire(quantity) {
    this.copperWire.addQuantity(quantity);
  }
}
