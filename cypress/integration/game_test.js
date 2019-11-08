describe("Chess game", () => {
    it("Should have 32 pices", () => {
      cy.visit("http://localhost:3000/");
      cy.get("[data-cy=piece]")
        .should("have.length", 32);
    });

    it("Should have 64 squares", () => {
      cy.visit("http://localhost:3000/");
      cy.get("[data-cy=square]")
        .should("have.length", 64);
    });
});