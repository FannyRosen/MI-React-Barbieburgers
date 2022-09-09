describe("hompage", () => {
  it("successfully loaded", () => {
    cy.visit("http://localhost:3000");
  });
});

it("goes to book route", () => {
  cy.visit("http://localhost:3000");

  cy.get(".booklink").click();

  cy.visit("http://localhost:3000/book");
});

it("goes to contact route", () => {
  cy.visit("http://localhost:3000");

  cy.get(".contactlink").click();

  cy.visit("http://localhost:3000/contact");
});
