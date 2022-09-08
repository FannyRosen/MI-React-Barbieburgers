it("should check availability", () => {
  cy.visit("http://localhost:3000/book");

  cy.get(".react-calendar__month-view__days > :nth-child(33)")
    .should("have.text", "30")
    .click();

  cy.get(".nop").select("4");

  cy.get(".checkavailability").should("be.visible");

  cy.get(".checkavailability").click();

  cy.get(".h2").should("have.text", "Available sittings");

  cy.get(".sitting1").should("be.visible");

  cy.get(".sitting1").click();
});
