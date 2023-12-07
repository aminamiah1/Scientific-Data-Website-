describe("Delete API Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin/delete-admins");
  });

  it("DELETE request", () => {
    cy.request({
      method: "DELETE",
      url: "/api/admin/delete-admins",
      body: { email: "test@admin.com" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });

    it("should confirm and delete an admin", () => {
      cy.intercept("GET", "/api/admin/get-admins", {
        fixture: "example.json",
      }).as("getAdmins");
      cy.intercept("DELETE", "/api/admin/delete-admins", {}).as("deleteAdmin");
      cy.wait("@getAdmins");
      cy.get("tbody tr").first().find("button").click();
      cy.on("window:confirm", () => true);
      cy.wait("@deleteAdmin");
      cy.get("tbody tr").should("have.length", 2);
    });
  });
});
