describe("Admin Sign-In", () => {

  it("successfully signs out", () => {
    cy.visit("/api/auth/signout");
    cy.get("#submitButton").click();
    cy.visit("/admin/add-admins");
    cy.contains("You are not authorized to view this page!").should("exist");
  });

  it("shows access denied when using incorrect email via API", () => {
    cy.request("GET", "/api/auth/csrf").then((response) => {
      const csrfToken = response.body.csrfToken;
      cy.request({
        method: "POST",
        url: "/api/auth/signin/email",
        followRedirect: false,
        failOnStatusCode: false,
        body: {
          email: "wronguser@gmail.com",
          csrfToken: csrfToken,
        },
      }).then((postResponse) => {
        const location = Array.isArray(postResponse.headers.location)
          ? postResponse.headers.location[0]
          : postResponse.headers.location;
        expect(location).to.include("/api/auth/error?error=AccessDenied");
      });
    });
  });
});
