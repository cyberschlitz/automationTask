import { formSignup } from "../../../src/components/form";
import faker from "faker";

describe("GUI test", () => {
  it("Go to Selenium webpage", () => {
    cy.visit("/Practiceform/");
    Cypress.on("uncaught:exception", () => {
      return false;
    });
  });

  it("Fill and submit “Contact us” form", () => {
    formSignup.submit(
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      `${faker.internet.email()}`,
      `${faker.phone.phoneNumberFormat()}`,
      `${faker.address.country()}`,
      `${faker.company.companyName()}`,
      `${faker.lorem.sentence()}`
    );
    formSignup.clickSubmitButton();
  });

  it("Assert “JAVA SCRIPT ALERT” box", () => {
    cy.get("#alert").should("have.text", "Alert Box").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Please share this website with your friends and in your organization."
      );
    });
  });

  it("Assert New Message Window", () => {
    cy.get(".wpb_wrapper")
      .find("p")
      .contains("New Message Window")
      .should("have.text", "New Message Window");
  });

  it("Take a screenshot of entire page", () => {
    cy.screenshot();
  });

  it("Assert “Selenium” element", () => {
    cy.get("#navigation")
      .find("ul > li")
      .contains("SELENIUM")
      .should("have.text", "SELENIUM");
  });
});
