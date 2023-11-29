describe("footer", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it('renders the footer', () => {
        cy.get('footer').should('be.visible');
      });
    
      it('has input fields with correct placeholders', () => {
        cy.get('#frm-name').should('have.attr', 'placeholder', 'Name');
        cy.get('#frm-email').should('have.attr', 'placeholder', 'Email');
        cy.get('#frm-phone').should('have.attr', 'placeholder', 'Phone');
      });
    
      it('has a message textarea with correct placeholder', () => {
        cy.get('#frm-message').should('have.attr', 'placeholder', 'Message');
      });
    
      it('has a submit button that can be clicked', () => {
        cy.get('button[type="submit"]').should('contain', 'Send Message');
      });
});

