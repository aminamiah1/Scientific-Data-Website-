describe('Dark Mode Toggle Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('finds the dark mode toggle button in the navbar', () => {
      cy.get('[data-testid="dark-mode-toggle"]').should('exist');
    });
  
    it('checks default mode and toggles to dark mode', () => {
      cy.get('body').should('not.have.class', 'dark');
      cy.get('[data-testid="dark-mode-toggle"]').click();
      cy.get('body').should('have.class', 'dark');
    });
  
    it('toggles back to light mode', () => {
      cy.get('[data-testid="dark-mode-toggle"]').click();
      cy.get('body').should('have.class', 'dark');
      cy.get('[data-testid="dark-mode-toggle"]').click();
      cy.get('body').should('not.have.class', 'dark');
    });
  });
  