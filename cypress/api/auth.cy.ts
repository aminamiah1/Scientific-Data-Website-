describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/api/auth/signin");
  });

  it("should display a error message after submitting an email", () => {
   cy.get('input[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Access Denied").should("be.visible");
    cy.contains("You do not have permission to sign in").should("be.visible");
  });
});
