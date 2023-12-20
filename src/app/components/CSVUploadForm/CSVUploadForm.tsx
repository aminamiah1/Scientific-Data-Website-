'use client';
import React, { useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";

interface CSVUploadFormProps {
  onUpload: (file: File, year: string) => 
    Promise<{ successMessage?: string, errorMessage?: string }>;
  label: string;
}

const CSVUploadForm: React.FC<CSVUploadFormProps> = ({ onUpload, label }) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
  
  const [year, setYear] = useState<string>(currentYear.toString());

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;

    if (selectedYear) {
      setYear(selectedYear);
    } else {
      setErrorMessage('Please select a year for this data.');
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSuccessMessage(null);

    if (selectedFile) {
      const isCSVFile = selectedFile.name.split('.').pop() === 'csv';
      if (isCSVFile) {
        setFile(selectedFile);
        setErrorMessage(null);
      } else {
        setErrorMessage('File must be a CSV.');
      }
    } else {
      setErrorMessage('Please select a valid CSV file.');
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file && year) {
      const headerMessage = await onUpload(file, year);
      if (headerMessage.errorMessage) {
        setSuccessMessage(null);
        setErrorMessage(headerMessage.errorMessage);
        return;
      } else if (headerMessage.successMessage) {
        setErrorMessage(null);
        setSuccessMessage(headerMessage.successMessage);
      }
      setFile(null);
    } else {
      setErrorMessage('Please select a valid CSV file/year.');
    }
  };

  return (
    <>
      <form data-cy='csv-upload-form' className='w-full' onSubmit={handleFormSubmit} method='post'>
        <div className='flex justify-between items-center w-3/4'>
          <div className='flex flex-col gap-2 p-3'>
            <label htmlFor='csvFileYear'>Year of this data:</label>
            <select
              className='csvFileYear text-black w-1/4'
              name='csvFileYear'
              id='csvFileYear'
              data-cy='csv-file-year'
              defaultValue={currentYear}
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label className='w-3/4' htmlFor='csvFile'>{label}:</label>
            <input
              type='file'
              name='csvFile'
              id='csvFile'
              data-cy='csv-file'
              className='csvFile'
              accept='.csv'
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button
              data-cy='csv-upload-form-button'
              className='formButton flex items-center bg-blue-500 hover:bg-blue-700 dark:bg-green-400 dark:hover:bg-green-600 text-white py-2 px-4 rounded'
              type='submit'
            >
              Upload <IoCloudUpload className='ml-2' />
            </button>
          </div>
        </div>
        {errorMessage && <p data-cy='error-message' className='errorMessage text-red-600'>{errorMessage}</p>}
        {successMessage && <p data-cy='success-message' className='successMessage text-green-600'>{successMessage}</p>}
      </form>
    </>
  );
};

export default CSVUploadForm;
