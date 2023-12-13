describe("Admin Sign-In", () => {
  it("successfully signs out", () => {
    cy.visit("/api/auth/signout");
    cy.get("#submitButton").click();
    cy.visit("/admin/add-admins");
    cy.contains("You are not authorized to view this page!").should("exist");
  });

  it("shows access denied when entering email", () => {
    cy.visit("/admin/sign-in");
    cy.get("#email")
      .type("wronguser@gmail.com")
      .then(() => {
        cy.get("#adminSubmit").click();
      });
    cy.url().should(
      "equal",
      "http://localhost:3000/api/auth/error?error=AccessDenied"
    );
  });
});
