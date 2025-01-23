import assert from "assert";
import sinon from "sinon";
import { stdout } from "test-console";
import CLI from "../src/cli";

sinon.stub(process, "exit");

describe("CLI", function () {
  describe("main", function () {
    it("works", function () {
      var output = stdout.inspectSync(function () {
        // Given
        var prompt = () => "quit";
        // When
        CLI.main(prompt);
      });

      // Then
      assert.deepEqual(output, [
        "\n--------------------------------------------------------------------------------\n",
        "          Welcome to Efficent Command System 2.0\n",
        "--------------------------------------------------------------------------------\n\n",
        "\n--------------------------------------------------------------------------------\n",
        "          System stopped\n",
        "--------------------------------------------------------------------------------\n\n",
      ]);
    });
  });

  describe("help", function () {
    it("works", function () {
      var output = stdout.inspectSync(function () {
        // Given
        const commands = ["help", "quit"];
        var prompt = () => {
          return commands.shift();
        };

        // When
        CLI.main(prompt);
      });

      // Then
      assert.deepEqual(output, [
        "\n--------------------------------------------------------------------------------\n",
        "          Welcome to Efficent Command System 2.0\n",
        "--------------------------------------------------------------------------------\n\n",
        "\nUnknown command\nThe available commands are the following : \n\n",
        "quit - quit the program\n",
        "order - create a new command\n",
        "help - displays the help\n",
        "\n",
        "\n--------------------------------------------------------------------------------\n",
        "          System stopped\n",
        "--------------------------------------------------------------------------------\n\n",
      ]);
    });
  });
});
