describe('Navbar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    const links = [
      { href: '/', text: 'Home', dataCy: 'nav-home' },
      { href: '/heat-demand', text: 'Heat Demand', dataCy: 'nav-heat-demand' },
      { href: '/breakdown/heat', text: 'Breakdown of Heat', dataCy: 'nav-breakdown-heat' },
      { href: '/breakdown/energy', text: 'Breakdown of Energy', dataCy: 'nav-breakdown-energy' },
      { href: '/half-hourly/gas-boilers', text: 'Half Hourly - Gas Boilers', dataCy: 'nav-half-hourly-gas-boilers' },
      { href: '/half-hourly/resistance-heaters', text: 'Half Hourly - Resistance Heaters', dataCy: 'nav-half-hourly-resistance-heaters' },
    ];
  
    links.forEach((link) => {
      it(`has a navigation link to ${link.text} that navigates to ${link.href}`, () => {
        cy.get(`a[data-cy="${link.dataCy}"]`).should('have.attr', 'href', link.href).and('contain', link.text);
      });
    });
  });
  