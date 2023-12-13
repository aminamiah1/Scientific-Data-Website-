describe("Admin Sign-In", () => {

  it("successfully signs out", () => {
    cy.visit("/api/auth/signout");
    cy.get("#submitButton").click();
  });

  it('shows access denied when entering email', () => {
    cy.visit("/admin/sign-in");
    cy.get('#email').type('user@example.com');
    cy.get("#admin-login-form").submit();
    cy.contains('Access Denied').should('exist');
  });
});
