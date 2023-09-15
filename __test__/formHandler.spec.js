import {
  handleSubmit,
  __RewireAPI__ as FormHandlerAPI,
} from "../src/client/js/formHandler";

import { analyzeText } from "../src/client/js/analyzeText";

// Use jsdom to test dom changes
import { JSDOM } from "jsdom";

const formData = {
  text: "As we now know that we cant buy happiness with money and there is no other shortcut to happiness. It is something that you feel from within. In addition, true happiness comes from within yourself. Happiness is basically a state of mind. Moreover, it can only be achieved by being positive and avoiding any negative thought in mind. And if we look at the bright side of ourselves only then we can be happy.\n        ",
};

const responseData = {
  agreement: "DISAGREEMENT",
  irony: "NONIRONIC",
  subjectivity: "SUBJECTIVE",
};

//Description off how to mock fetch within JEST
//Code based on https://www.leighhalliday.com/mock-fetch-jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(responseData),
  }),
);

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", async () => {
    // Set up document
    const { window } = new JSDOM(
      "<html><head></head><body><div id='results'></div><form><textarea id='text' name='text'>Test</textarea></form></body></html>",
    );
    global.document = window.document;
    global.window = window;
    global.FormData = window.FormData;

    expect(handleSubmit).toBeDefined();

    // Mock event
    const event = { preventDefault: () => {} };

    // Store results globally
    FormHandlerAPI.__Rewire__("showResults", (data) => {
      global.showResultsData = data;
    });

    await handleSubmit(event);

    const result = global.showResultsData;

    expect(result).toHaveProperty("agreement");
    expect(result).toHaveProperty("irony");
    expect(result).toHaveProperty("subjectivity");
  });

  test("Testing the analyzeText() function", async () => {
    expect(analyzeText).toBeDefined();

    const result = await analyzeText(formData);

    expect(result).toHaveProperty("agreement");
    expect(result).toHaveProperty("irony");
    expect(result).toHaveProperty("subjectivity");
  });

  test("Testing the showResults() function", () => {
    // Reset dependency back to original implementation
    FormHandlerAPI.__ResetDependency__("showResults");

    const showResults = FormHandlerAPI.__get__("showResults");
    expect(showResults).toBeDefined();

    // Set up document
    const { window } = new JSDOM(
      "<html><head></head><body><div id='results'></div></body></html>",
    );

    global.document = window.document;
    global.window = window;

    showResults(responseData);

    const agreement = document.body.firstChild.firstChild.children[0];
    const irony = document.body.firstChild.firstChild.children[1];
    const subjectivity = document.body.firstChild.firstChild.children[2];

    expect(agreement.innerHTML).toBe("Agreement: DISAGREEMENT");
    expect(irony.innerHTML).toBe("Irony: NONIRONIC");
    expect(subjectivity.innerHTML).toBe("Subjectivity: SUBJECTIVE");
  });
});
