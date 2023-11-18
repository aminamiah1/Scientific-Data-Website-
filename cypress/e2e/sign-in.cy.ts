describe("LoginCard Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin/sign-in");
  });

  it("should render the login form", () => {
    cy.get(".login-form").should("exist");
  });

  it("should allow typing in the username field", () => {
    cy.get("#username").type("testuser").should("have.value", "testuser");
  });

  it("should allow typing in the password field", () => {
    cy.get("#password").type("password").should("have.value", "password");
  });

  it("should handle login click", () => {
    cy.get("#username").type("testuser@gmail.com");
    cy.get("#password").type("password");
    cy.get(".login-form").find('button[type="submit"]').click();

    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get(".login-form")
      .find('button[type="submit"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "You have successfully logged in."
        );
      });
  });

  it("should have a working forgot password link", () => {
    cy.get("a").contains("Forgot Password?").should("have.attr", "href");
  });

  it("renders the component", () => {
    cy.get(".login-form").should("exist");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it('shows an error message for invalid email', () => {
    cy.get('#username').type('invalidEmail');
    cy.get('#password').type('password112');
    cy.get('.login-form').submit();
    cy.get('.text-red-500').should('contain', 'Please enter a valid email address.');
  });

  it('does not show an error message for valid email', () => {
    cy.get('#username').type('validEmail@example.com');
    cy.get('#password').type('password112');
    cy.get('.login-form').submit();
    cy.get('.text-red-500').should('not.exist');
  });
});
