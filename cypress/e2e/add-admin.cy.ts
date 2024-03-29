describe("Add Admin Form", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/auth/session", {
      statusCode: 200,
      body: {
        user: { name: "John", email: "admin@example.com", role: "admin" },
        expires: "date-string",
      },
    });
    cy.visit("http://localhost:3000/admin/add-admins");
  });

  it("allows an admin to add another admin", () => {
    cy.get('[data-cy="name"]').type("New"); 
    cy.get('[data-cy="email"]').type("newadmin@example.com"); 
    cy.intercept("POST", "/api/admin/add-admins", {
      statusCode: 200,
      body: { name: "New", email: "newadmin@example.com", role: "ADMIN" },
    }).as("addAdmin");
    cy.get('[data-cy="addForm"]').submit();
    cy.wait("@addAdmin").its("response.statusCode").should("eq", 200);
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Admin added successfully`);
    });
  });
});
