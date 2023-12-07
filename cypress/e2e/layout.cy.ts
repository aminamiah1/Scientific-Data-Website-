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
});
