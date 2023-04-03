/// <reference types="cypress" />

const { faker } = require("@faker-js/faker");

const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomEmail = faker.internet.email();

describe("Join application form", () => {
  beforeEach(() => {
    // Navigating to allocate.co before each test
    cy.visit("https://www.allocate.co/");
  });

  it("User should fill and submit application form successfully", () => {
    cy.get(".intro-text > .cta-link").click();

    // Filling out First and Last Names, Email
    cy.get("#Firstname").type(randomFirstName);
    cy.get("#Lastname").type(randomLastName);
    cy.get("#Email").type(randomEmail);

    // Filling out the refference box
    cy.get("#Referredby").type("none");

    // Choosing Ukraine as a country of Residence
    cy.get(".input-wrapper").type("Ukraine");
    cy.get(".option-override").each(($el, index, $list) => {
      if ($el.text() === " Ukraine") {
        cy.wrap($el).click();
      }
    });

    //typing Linkedin profile
    cy.get(".text-input").each(($el, index, $list) => {
      if (index === 3) {
        cy.wrap($el).type(
          "https://www.linkedin.com/in/" +
            `${randomFirstName}-${randomLastName}`
        );
      }
    });

    //choosing 'For youself' answer fro capital allocation
    cy.get(".answer").each(($el, index, $list) => {
      if (index === 0) {
        cy.wrap($el).click();
      }
    });

    //Pressing Submit button
    cy.get("button").contains("Submit").click();
    cy.wait(3000);

    // Verifying  the message confirming submittion of application
    cy.get(".title").should("have.text", "Thank you for applying!");

    // Verifying the impossibility to register for the residents from Ukraine
    cy.get(".form div")
      .invoke("text")
      .then((text) => {
        expect(text).contain(
          "Unfortunately, we are not able to accept applicants from your country of residence at this time"
        );
      });
  });
});
