describe("Admin Sign-In", () => {
  beforeEach(() => {
    cy.visit("/admin/sign-in");
  });

  it('should display "Access Denied" for an incorrect email', () => {
    cy.get("#email").type("admin@example.com");
    cy.get("#admin-login-form").submit();

    cy.contains("Access Denied").should("be.visible");
  });
});
