describe("Admin page", () => {
  it("should contain all bookings including customer", () => {
    cy.visit("http://localhost:3000/admin");

    cy.get("#input").click().type("test");

    cy.get("#h4").should("contain.html", "test guest name");

    cy.get("#viewbookings").click();

    cy.get("#date-link").should("be.visible").click();
  });
});
