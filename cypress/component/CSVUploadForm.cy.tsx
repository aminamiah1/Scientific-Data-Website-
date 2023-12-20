import React from 'react';
import CSVUploadForm from "@/app/components/CSVUploadForm/CSVUploadForm";
import { getFormattedCSVData } from "@/app/utils/const";
import { AnnualHeatDemandLSOAHeaders } from '@/app/utils/headers';

import 'cypress-file-upload';

const handleLSOAFileUpload = async (file: File, year: string): Promise<{ successMessage?: string, errorMessage?: string }> => {
  const formattedCSV = await getFormattedCSVData(file);
  for (let i = 0; i < AnnualHeatDemandLSOAHeaders.length; i++) {
    if(!formattedCSV[i].match(AnnualHeatDemandLSOAHeaders[i])) {
      return { errorMessage: 'This file contains invalid headers.' };
    }
  }

  const response: FileUploadResponse = await uploadCSV(file, year, 'AHDLSOA');

  if (response.errorMessage) {
    return { errorMessage: response.errorMessage };
  } else if (response.successMessage) {
    return { successMessage: response.successMessage };
  }

  return { errorMessage: 'Something went wrong.' };
}

const uploadCSV = async (file: File, year: string, data: 'AHDLSOA' | 'EEICLA' | 'HHPoHT') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('year', year);

  const response = await fetch(`/api/admin/upload/${data}`, {
    method: 'POST',
    body: formData
  });

  return await response.json();
}

describe('CSV Upload Form Component', () => {
  beforeEach(() => {
    cy.mount(<CSVUploadForm onUpload={handleLSOAFileUpload} label="Annual Heat Demand LSOA Data" />);
  });

  it('should render the upload file card', () => {
    cy.getByTestId('csv-upload-form').should('exist');
    cy.getByTestId('csv-file-year').should('exist');
    cy.getByTestId('csv-file').should('exist');
    cy.getByTestId('csv-upload-form-button').should('exist');
    cy.getByTestId('error-message').should('not.exist');
    cy.getByTestId('success-message').should('not.exist');
  });

  it('should display an error if the file uploaded is not a CSV', () => {
    const textFile: string = 'uploads/upload.txt';

    cy.fixture(textFile).then(fileContent => {
      cy.getByTestId('csv-file')
        .attachFile({
          fileContent: fileContent.toString(),
          fileName: textFile,
          mimeType: 'text/plain'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(textFile);
        });

      cy.getByTestId('error-message').should('have.text', 'File must be a CSV.');
    });
  });

  it('should display an error if the user tries to submit a wrong file', () => {
    const textFile: string = 'uploads/upload.txt';

    cy.fixture(textFile).then(fileContent => {
      cy.getByTestId('csv-file')
        .attachFile({
          fileContent: fileContent.toString(),
          fileName: textFile,
          mimeType: 'text/plain'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(textFile);
        });

      cy.get('.formButton').click();
      cy.get('.errorMessage').should('have.text', 'Please select a valid CSV file/year.');
    });
  });

  it('should display an error if the CSV file has the wrong headers', () => {
    const csvFile: string = 'uploads/upload.csv';

    cy.fixture(csvFile).then(fileContent => {
      cy.get('.csvFile')
        .attachFile({
          fileContent: fileContent.toString(),
          fileName: csvFile,
          mimeType: 'text/csv'
        })
        .then(input => {
          const selectedFileName: string = input.prop('files')[0].name;
          expect(selectedFileName).to.equal(csvFile);
        });

      cy.get('.formButton').click();
      cy.get('.errorMessage').should('have.text', 'This file contains invalid headers.');
    });
  });
});
