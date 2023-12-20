const baseURL: string = 'localhost:3000/api';
const baseResponse: string = '- GET request';
describe('/admin/sign-in', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/admin/sign-in`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/admin/sign-in`)
      .its('body')
      .should('deep.equal', { message: `Log in ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/admin/sign-in`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/admin/sign-out', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/admin/sign-out`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/admin/sign-out`)
      .its('body')
      .should('deep.equal', { message: `Log out ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/admin/sign-out`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/energy/dwelling', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/energy/dwelling`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/energy/dwelling`)
      .its('body')
      .should('deep.equal', { message: `Breakdown energy - dwelling type ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/energy/dwelling`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/energy/tech', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/energy/tech`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/energy/tech`)
      .its('body')
      .should('deep.equal', { message: `Breakdown energy - heating technology ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/energy/tech`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/energy/total', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/energy/total`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/energy/total`)
      .its('body')
      .should('deep.equal', { message: `Breakdown energy - total heat demand ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/energy/tech`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/heat/dwelling', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/heat/dwelling`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/heat/dwelling`)
      .its('body')
      .should('deep.equal', { message: `Breakdown heat - dwelling type ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/heat/dwelling`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/heat/tech', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/heat/tech`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/heat/tech`)
      .its('body')
      .should('deep.equal', { message: `Breakdown heat - heating technology ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/heat/tech`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/breakdown/heat/total', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/breakdown/heat/total`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/breakdown/heat/total`)
      .its('body')
      .should('deep.equal', { message: `Breakdown heat - total heat demand ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/breakdown/heat/total`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/half-hourly/energy', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/half-hourly/energy`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/half-hourly/energy`)
      .its('body')
      .should('deep.equal', { message: `Half hourly heat production and energy consumption ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/half-hourly/energy`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/half-hourly/gas', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/half-hourly/gas`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/half-hourly/gas`)
      .its('body')
      .should('deep.equal', { message: `Half hourly heat production and gas consumption ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/half-hourly/gas`)
      .its('status')
      .should('equal', 200)
  });
});

describe('/heat-demand', () => {
  it('GET request', () => {
    cy.request('GET', `${baseURL}/heat-demand`)
      .its('status')
      .should('equal', 200)
      cy.request('GET', `${baseURL}/heat-demand`)
      .its('body')
      .should('deep.equal', { message: `Heat demand ${baseResponse}` })
  });

  it('POST request', () => {
    cy.request('POST', `${baseURL}/heat-demand`)
      .its('status')
      .should('equal', 200)
  });
});
