describe('Contact Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('renders the contact form', () => {
      cy.get('footer').should('be.visible');
      cy.get('footer').contains('h2', 'Contact Us!');
      cy.get('#frm-name').should('be.visible');
      cy.get('#frm-email').should('be.visible');
      cy.get('#frm-phone').should('be.visible');
      cy.get('#frm-message').should('be.visible');
    });
  
    it('validates required fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('input:invalid').should('have.length', 3); 
      cy.get('textarea:invalid').should('exist'); 
    });
  
    it('accepts input in form fields', () => {
      cy.get('#frm-name').type('John Doe').should('have.value', 'John Doe');
      cy.get('#frm-email').type('john@example.com').should('have.value', 'john@example.com');
      cy.get('#frm-phone').type('1234567890').should('have.value', '1234567890');
      cy.get('#frm-message').type('Hello, this is a test message.').should('have.value', 'Hello, this is a test message.');
    });
  
    it('submits form with valid data', () => {
      cy.get('#frm-name').type('Test User');
      cy.get('#frm-email').type('testuser@example.com');
      cy.get('#frm-phone').type('9876543210');
      cy.get('#frm-message').type('This is a test submission.');
      cy.get('form').submit();
      cy.get('.text-green-500').should('contain', 'Email sent successfully!');
    });
    
    it('clears form fields after successful submission', () => {
        cy.get('#frm-name').type('Test User');
        cy.get('#frm-email').type('testuser@example.com');
        cy.get('#frm-phone').type('9876543210');
        cy.get('#frm-message').type('This is a test submission.');
      
        cy.get('form').submit();
      
        cy.get('.text-green-500').should('contain', 'Email sent successfully!');
      
        cy.get('#frm-name').should('have.value', '');
        cy.get('#frm-email').should('have.value', '');
        cy.get('#frm-phone').should('have.value', '');
        cy.get('#frm-message').should('have.value', '');
      });
      

  });
  