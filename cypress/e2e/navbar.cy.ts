describe('Navbar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    it('renders the navbar with correct background and height', () => {
      cy.get('div.bg-banner-bg').should('have.class', 'h-96');
    });
  
    const links = [
      { href: '/', text: 'Home', dataCy: 'nav-home' },
      { href: '/heat-demand', text: 'Heat Demand', dataCy: 'nav-heat-demand' },
      { href: '/breakdown/heat', text: 'Breakdown OF Heat', dataCy: 'nav-breakdown-heat' },
      { href: '/breakdown/energy', text: 'Breakdown OF Energy', dataCy: 'nav-breakdown-energy' },
      { href: '/half-hourly/gas-boilers', text: 'Half hourly - Gas Boilers', dataCy: 'nav-half-hourly-gas-boilers' },
      { href: '/half-hourly/resistance-heaters', text: 'Half hourly - Resistance Heaters', dataCy: 'nav-half-hourly-resistance-heaters' },
    ];
  
    links.forEach((link) => {
      it(`has a navigation link to ${link.text} that navigates to ${link.href}`, () => {
        cy.get(`a[data-cy="${link.dataCy}"]`).should('have.attr', 'href', link.href).and('contain', link.text);
      });
    });
  });
  