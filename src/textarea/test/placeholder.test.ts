import { expect, fixture } from "@open-wc/testing";
import { TextArea } from "../index";

describe("Textarea", () => {
  describe("placeholder", () => {
    it("placeholder will be empty when not setting placeholder in constructor", async () => {
      const container = new TextArea();

      const el = await fixture(container);
      const textAreaEl = el.querySelector(
        ".kuc-textarea__group__textarea"
      ) as HTMLTextAreaElement;

      expect(textAreaEl.getAttribute("placeholder")).to.equal("");
    });

    it("placeholder will be not empty when setting placeholder in constructor", async () => {
      const container = new TextArea({ placeholder: "Fruit" });

      const el = await fixture(container);
      const textAreaEl = el.querySelector(
        ".kuc-textarea__group__textarea"
      ) as HTMLTextAreaElement;

      expect(textAreaEl.getAttribute("placeholder")).to.equal("Fruit");
    });

    it("placeholder will be changed when updating placeholder", async () => {
      const container = new TextArea();
      container.placeholder = "Fruit";

      const el = await fixture(container);
      const textAreaEl = el.querySelector(
        ".kuc-textarea__group__textarea"
      ) as HTMLTextAreaElement;

      expect(textAreaEl.getAttribute("placeholder")).to.equal("Fruit");
    });

    it("placeholder will be changed when replacing placehoder", async () => {
      const container = new TextArea({ placeholder: "Fruit" });
      container.placeholder = "Food";

      const el = await fixture(container);
      const textAreaEl = el.querySelector(
        ".kuc-textarea__group__textarea"
      ) as HTMLTextAreaElement;

      expect(textAreaEl.getAttribute("placeholder")).to.equal("Food");
    });
  });
});
