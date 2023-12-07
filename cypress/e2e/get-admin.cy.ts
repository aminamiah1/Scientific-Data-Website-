describe("AdminsPage GET tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin/delete-admins");
  });

  it("GET request", () => {
    cy.request({
      method: "GET",
      url: "/api/admin/get-admins",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });

    it("should fetch and display admins", () => {
      cy.intercept("GET", "/api/admin/get-admins", {
        fixture: "example.json",
      }).as("getAdmins");
      cy.wait("@getAdmins");
      cy.get("table").should("be.visible");
      cy.get("tbody tr").should("have.length", 3);
    });
  });
});
