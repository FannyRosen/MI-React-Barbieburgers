describe("Admin page", () => {
  it("should contain all bookings including customer", () => {
    cy.visit("http://localhost:3000/admin");

    cy.get("#input").click().type("test");

    cy.get("#h4").should("contain.html", "test guest name");

    cy.get("#viewbookings").click();

    cy.get("#date-link").should("be.visible").click();

    cy.get(".singlename").should("contain.text", "Customer: test guest name");

    cy.get(".singleemail").should("contain.text", "Email: test@guest.se");

    cy.get(".singlephone").should("contain.text", "Phone: 07290887744");

    //UPDATE BOOKING
    cy.get(".editbutton").click();

    cy.get(".bookingform").within(() => {
      cy.get(".react-calendar__month-view__days > :nth-child(32)")
        .should("have.text", "29")
        .click();

      cy.get(".nop").select("2");

      cy.get(".updateSitting").select("2");

      cy.get(".updateBooking").click();
    });

    it("should contain all bookings including customer", () => {
      cy.visit("http://localhost:3000/admin");

      cy.get("#input").click().type("test");

      cy.get("#h4").should("contain.html", "test guest name");

      cy.get("#viewbookings").click();

      cy.get("#date-link").should("be.visible").click();

      cy.get(".singlename").should("contain.text", "Customer: test guest name");

      cy.get(".singleemail").should("contain.text", "Email: test@guest.se");

      cy.get(".singlephone").should("contain.text", "Phone: 07290887744");
    });

    //DELETE BOOKING
    cy.get(".deletebutton").click();

    cy.get(".confirmbutton").click();
    //RETURN TO CHECK THAT THERE ARE NO RESERVATIONS FOR THIS CUSTOMER
    cy.visit("http://localhost:3000/admin");

    cy.get("#input").click().type("test");

    cy.get("#h4").should("contain.html", "test guest name");

    // cy.get("#viewbookings").click();

    cy.get(".nobookings").should("contain.text", "");
  });
});
