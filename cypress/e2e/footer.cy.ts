describe('Footer', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });

    it('renders the footer', () => {
        cy.get('footer').should('be.visible');
      });
    
      it('Contains Contact Us header', () => {
        cy.get('footer').contains('h2', 'Contact Us!');
      });
    
      it('Has name, email, phone, and message fields', () => {
        cy.get('#frm-name').should('be.visible');
        cy.get('#frm-email').should('be.visible');
        cy.get('#frm-phone').should('be.visible');
        cy.get('#frm-message').should('be.visible');
      });
    
      it('Accepts input in form fields', () => {
        cy.get('#frm-name').type('Sarah').should('have.value', 'Sarah');
        cy.get('#frm-email').type('sarah@gmail.com').should('have.value', 'sarah@gmail.com');
        cy.get('#frm-phone').type('1234567890').should('have.value', '1234567890');
        cy.get('#frm-message').type('Test message').should('have.value', 'Test message');
      });
    
});
