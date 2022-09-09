/* let text = "";
let possible = text.length.toString; */

describe("Booking test from checking availability to making reservation", () => {
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

  it("should  save information and make a reservation", () => {
    cy.get(".name").type("Test Guest Name");

    cy.get(".email").type("test@guest.se");

    cy.get(".phone").type("07290887744");

    cy.get(".openmodal").click();

    cy.get(".accept").click();

    cy.get(".checkbox").click();

    cy.get(".book").click();

    cy.get(".thankyou").should("be.visible");

    cy.get(".thankyou > :nth-child(1)").should(
      "contain.html",
      "Thank you Test Guest Name!"
    );

    cy.get(".thankyou > :nth-child(2)").should(
      "contain.html",
      "Your booking is completed!<br> A confirmation email has been sent to: test@guest.se"
    );

    /*  cy.get(".thankyou > :nth-child(3)").should(
      "contain.html",
      `Date: 2022-09-30 <br>Number of people: 4 <br>Booking number: ${possible}`
    ); */

    cy.wait(10000).visit("http://localhost:3000");
  });
});
