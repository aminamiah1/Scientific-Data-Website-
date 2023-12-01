describe("Layout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('renders the Footer at the bottom of the page', () => {
    cy.get('footer').should('be.visible');
  });

  it('renders the main content area', () => {
    cy.get('main').should('exist');
  });

  it("Should be able to navigate to every page", () => {
    // Sticking to best practises, as per:
    // https://docs.cypress.io/guides/references/best-practices#How-It-Works
    cy.getByTestId("nav-heat-demand").click();
    cy.url().should("include", "/heat-demand");

    cy.getByTestId("nav-breakdown-heat").click();
    cy.url().should("include", "/breakdown/heat");

    cy.getByTestId("nav-breakdown-energy").click();
    cy.url().should("include", "/breakdown/energy");

    cy.getByTestId("nav-half-hourly-gas-boilers").click();
    cy.url().should("include", "/half-hourly/gas-boilers");

    cy.getByTestId("nav-half-hourly-resistance-heaters").click();
    cy.url().should("include", "/half-hourly/resistance-heaters");

    cy.getByTestId("nav-login-sign-in").click();
    cy.url().should("include", "/admin/sign-in");

    cy.getByTestId("nav-login-sign-up").click();
    cy.url().should("include", "/admin/sign-up");
  });
});
