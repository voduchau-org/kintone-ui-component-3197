import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { DatePicker } from "../index";

describe("TimePicker", () => {
  describe("change event", () => {
    it("should be triggered when ArrowRight/ArrowLeft on date in calendar", async () => {
      let triggeredEvent: any = null;
      const container = new DatePicker({ value: "2021-12-20" });
      container.addEventListener("change", event => {
        triggeredEvent = event;
      });

      const el = await fixture(container);

      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.click();
      await elementUpdated(container);
      await elementUpdated(el);

      const selectedElRight = el.querySelector(
        'kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]'
      ) as HTMLButtonElement;

      selectedElRight.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-21");

      const selectedElLeft = el.querySelector(
        'kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]'
      ) as HTMLButtonElement;

      selectedElLeft.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-20");
    });

    it("should be triggered when ArrowUp/ArrowDown on date in calendar", async () => {
      let triggeredEvent: any = null;
      const container = new DatePicker({ value: "2021-12-20" });
      container.addEventListener("change", event => {
        triggeredEvent = event;
      });

      const el = await fixture(container);
      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.click();
      await elementUpdated(container);
      await elementUpdated(el);

      const selectedElUp = el.querySelector(
        'kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]'
      ) as HTMLButtonElement;

      selectedElUp.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowUp" })
      );
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-13");

      const selectedElDown = el.querySelector(
        'kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]'
      ) as HTMLButtonElement;

      selectedElDown.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown" })
      );
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-20");
    });

    it("should be triggered when mousedown on date in calendar", async () => {
      let triggeredEvent: any = null;
      const container = new DatePicker({ value: "2021-12-20", language: "en" });
      container.addEventListener("change", event => {
        triggeredEvent = event;
      });

      const el = await fixture(container);

      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.click();
      await elementUpdated(container);
      await elementUpdated(el);

      const selectedElUp = el.querySelector(
        'kuc-base-datetime-calendar-body .kuc-base-datetime-calendar-body__table__date__button[aria-current="true"]'
      ) as HTMLButtonElement;

      const nextEl = selectedElUp.parentElement
        ?.nextElementSibling as HTMLTableCellElement;
      const buttonEl = nextEl.firstElementChild as HTMLButtonElement;
      buttonEl.click();
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-21");
    });

    it("should be triggered with error when change value on input", async () => {
      let triggeredEvent: any = null;
      const container = new DatePicker({
        value: "2021-12-20",
        language: "auto"
      });
      document.documentElement.setAttribute("lang", "en");
      container.addEventListener("change", event => {
        triggeredEvent = event;
      });

      const el = await fixture(container);

      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.value = "2021-12/12";
      inputDateEl.dispatchEvent(new Event("change"));
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal(undefined);

      inputDateEl.value = "12/12/2021";
      inputDateEl.dispatchEvent(new Event("change"));
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal("2021-12-12");
    });

    it("should be triggered when click none button on calendar", async () => {
      let triggeredEvent: any = null;
      const container = new DatePicker({ value: "2021-12-20", language: "en" });
      container.addEventListener("change", event => {
        triggeredEvent = event;
      });
      const el = await fixture(container);
      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.click();
      await elementUpdated(container);
      await elementUpdated(el);

      const noneBtnEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none"
      ) as HTMLButtonElement;
      noneBtnEl.click();
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal(undefined);

      inputDateEl.click();
      await elementUpdated(container);
      await elementUpdated(el);

      const noneBtnElEmpty = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none"
      ) as HTMLButtonElement;
      noneBtnElEmpty.click();
      await elementUpdated(container);

      expect(triggeredEvent.type).to.equal("change");
      expect(triggeredEvent.detail.value).to.equal(undefined);
    });

    it("should be 2021-12-13 when change input value", async () => {
      const container = new DatePicker({ value: "2021-12-20", language: "en" });
      const el = await fixture(container);
      const inputDateEl = el.querySelector(
        ".kuc-base-date__input"
      ) as HTMLInputElement;

      inputDateEl.value = "12/13/2021";
      inputDateEl.dispatchEvent(new Event("input"));
      await elementUpdated(container);
      await elementUpdated(el);

      expect(inputDateEl.value).to.equal("12/13/2021");
    });
  });
});
