describe("Layout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should be able to navigate to every page", () => {
    // Sticking to best practises, as per:
    // https://docs.cypress.io/guides/references/best-practices#How-It-Works
    cy.get('[data-cy="nav-heat-demand"]').click();
    cy.url().should("include", "/heat-demand");

    cy.get('[data-cy="nav-breakdown-heat"]').click();
    cy.url().should("include", "/breakdown/heat");

    cy.get('[data-cy="nav-breakdown-energy"]').click();
    cy.url().should("include", "/breakdown/energy");

    cy.get('[data-cy="nav-half-hourly-gas-boilers"]').click();
    cy.url().should("include", "/half-hourly/gas-boilers");

    cy.get('[data-cy="nav-half-hourly-resistance-heaters"]').click();
    cy.url().should("include", "/half-hourly/resistance-heaters");

    cy.get('[data-cy="nav-login-sign-in"]').click();
    cy.url().should("include", "/admin/sign-in");

    cy.get('[data-cy="nav-login-sign-up"]').click();
    cy.url().should("include", "/admin/sign-up");
  });
});
