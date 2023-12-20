/// <reference types="cypress" />
import 'cypress-file-upload';

describe('Admin Dashboard', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/auth/session", {
      statusCode: 200,
      body: {
        user: { name: "John", email: "admin@example.com", role: "admin" },
        expires: "date-string",
      },
    });
    cy.visit('http://localhost:3000/admin/dashboard');
  });

  it('should render the upload file card', () => {
    cy.get('[data-cy="admin-csv-upload-form"]').should('exist');
  });

  it('should allow a user to upload correct .csv files', () => {
    const LSOAData: string = 'uploads/LSOA_headers.csv';
    const costsData: string = 'uploads/Costs_headers.csv';
    const halfHourlyData: string = 'uploads/Half_hourly_headers.csv';

    cy.fixture(LSOAData).then(file1Content => {
      cy.get('.csvFile').eq(0)
        .attachFile({
          fileContent: file1Content.toString(),
          fileName: LSOAData,
          mimeType: 'text/csv'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(LSOAData);
        });
    });

    cy.fixture(costsData).then(file1Content => {
      cy.get('.csvFile').eq(1)
        .attachFile({
          fileContent: file1Content.toString(),
          fileName: costsData,
          mimeType: 'text/csv'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(costsData);
        });
    });

    cy.fixture(halfHourlyData).then(file1Content => {
      cy.get('.csvFile').eq(2)
        .attachFile({
          fileContent: file1Content.toString(),
          fileName: halfHourlyData,
          mimeType: 'text/csv'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(halfHourlyData);
        });
    });
  });

  it('redirects to /add-admins using navbar icon', () => {
    cy.getByTestId('add-admin-icon-link').click();
    cy.url().should('equal', 'http://localhost:3000/admin/add-admins');
  });

  it('redirects to /delete-admins using navbar icon', () => {
    cy.getByTestId('delete-admin-icon-link').click();
    cy.url().should('equal', 'http://localhost:3000/admin/delete-admins');
  });
});
