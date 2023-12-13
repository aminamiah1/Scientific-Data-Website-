describe("Admin Sign-In", () => {
  it("successfully signs out", () => {
    cy.visit("/api/auth/signout");
    cy.get("#submitButton").click();
    cy.visit("/admin/add-admins");
    cy.contains("You are not authorized to view this page!").should("exist");
  });
});
