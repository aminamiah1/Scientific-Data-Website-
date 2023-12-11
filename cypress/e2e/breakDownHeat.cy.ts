describe('BreakDownHeat page functions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/breakdown/heat'); 
      });
    it('loads the map successfully after page is initiated', () => {
        cy.get('#map').should('exist');
    });
});
