import defaultPrompt from "synchro-prompt";
import Command from "./command";



export default class CLI {
  private static prompt: any;
  private static COMMANDS = [
    "quit - quit the program",
    "order - create a new command",
    "help - " + "displays the help",
  ];

  static main(prompt = defaultPrompt) {
    this.prompt = prompt
    this.showDivider("Welcome to Efficent Command System 2.0");
    this.loop();
  }

  static loop() {
    var n = this.prompt("Enter command : ");

    switch (n) {
      case "quit":
        this.showDivider("System stopped");
        process.exit();
        break;
      case "order":
        this.createOrder();
        break;
      default:
        this.showHelp();
        this.loop();
    }
  }

  static createOrder() {
    const order = new Command();

    this.showDivider("Order Menu");

    console.log("New order created.");
    console.log("Add new elements to your order");
    this.addStuff(order);
    this.orderLoop(order);
  }

  static addStuff(order: Command) {
    var v = this.prompt("\nWhat do you want to add to order: ");
    var quantity = 0;
    switch (v) {
      case "prepend":
        console.log("\nHow many perpends palets do you need ?");
        quantity = this.prompt("Enter quantity : ");
        order.addPrepend(quantity);
        break;
      case "wire":
        console.log("\nHow many copper wire meters do you need ?");
        quantity = this.prompt("Enter quantity : ");
        order.addCopperWire(quantity);
        break;
      default:
        console.info("\nNothing added");
    }
  }

  static orderLoop(order: Command) {
    var c = this.prompt("\nEnter order command : ");

    switch (c.trim()) {
      case "show":
        this.showOrder(order);
        break;
      case "add":
        this.addStuff(order);
        break;
      case "save":
        order.save();
      case "stop":
        console.log("\nQuit Order Menu\n");
        this.loop();
        return;
      default:
        this.showHelp();
    }
    this.orderLoop(order);
  }

  static showOrder(order) {
    order.show();
  }

  static showHelp() {
    console.log(
      "\nUnknown command\nThe available commands are the following : \n"
    );
    for (var i = 0; i < this.COMMANDS.length; i++) {
      console.log(this.COMMANDS[i]);
    }
    console.log("");
  }

  static showDivider(title) {
    console.log(
      "\n--------------------------------------------------------------------------------"
    );
    console.log("          " + title);
    console.log(
      "--------------------------------------------------------------------------------\n"
    );
  }
}

if (require.main === module) {
  // @ts-ignore
  CLI.main()
}
