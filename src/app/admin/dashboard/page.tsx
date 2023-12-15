'use client';
import React, { useEffect } from 'react';
import { getFormattedCSVData } from '@/app/utils/const';
import CSVUploadForm from '../../components/CSVUploadForm/CSVUploadForm';
import AuthContext from '@/app/utils/authContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CgSpinner } from "react-icons/cg";

import text from '@/app/admin/dashboard/text.json';
import { AnnualHeatDemandLSOAHeaders, EnergyEfficiencyImprovementsCostsLAHeaders, HalfHourlyProfilesOfHeatingTechnologiesHeaders } from '@/app/utils/headers';

const AdminDashboard = () => {

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    status !== 'authenticated' && router.push('/admin/sign-in');
  }, [status]);

  const handleAHDLSOAFileUpload = async (file: File, year: string): Promise<FileUploadResponse> => {
    return handleFileUpload(file, year, 'AHDLSOA');
  }

  const handleEEICLAFileUpload = async (file: File, year: string): Promise<FileUploadResponse> => {
    return handleFileUpload(file, year, 'EEICLA');
  }

  const handleHHPoHTFileUpload = async (file: File, year: string): Promise<FileUploadResponse> => {
    return handleFileUpload(file, year, 'HHPoHT');
  }

  const handleFileUpload = async (file: File, year: string, data: 'AHDLSOA' | 'EEICLA' | 'HHPoHT') => {
    const formattedCSV = await getFormattedCSVData(file);
    switch(data) {
      case 'AHDLSOA':
        for (let i = 0; i < AnnualHeatDemandLSOAHeaders.length; i++) {
          if(!formattedCSV[i].match(AnnualHeatDemandLSOAHeaders[i])) {
            return { errorMessage: 'This file contains invalid headers.' };
          }
        }
        break;
      case 'EEICLA':
        for (let i = 0; i < EnergyEfficiencyImprovementsCostsLAHeaders.length; i++) {
          if(!formattedCSV[i].match(EnergyEfficiencyImprovementsCostsLAHeaders[i])) {
            return { errorMessage: 'This file contains invalid headers.' };
          }
        }
        break;
      case 'HHPoHT':
        for (let i = 0; i < HalfHourlyProfilesOfHeatingTechnologiesHeaders.length; i++) {
          if(!formattedCSV[i].match(HalfHourlyProfilesOfHeatingTechnologiesHeaders[i])) {
            return { errorMessage: 'This file contains invalid headers.' };
          }
        }
        break;
      default:
        console.error(`Data entered was incorrect: ${data}`);
    }
    

    const response: FileUploadResponse = await uploadCSV(file, year, data);

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

  return (
    <>
      {status !== 'authenticated' ? (
        <CgSpinner className='spinner mx-auto my-16 w-16 h-16' />
      ) : (
        <div className='py-12 dark:bg-slate-900'>
          <div data-cy='admin-csv-upload-form' className='flex flex-col justify-center items-center w-fit bg-gray-100 dark:bg-slate-600 mx-auto p-5 rounded-md shadow-md dark:text-white'>
            <CSVUploadForm onUpload={handleAHDLSOAFileUpload} label={text.LSOADataLabel} />
            <hr className='border-t-2 w-full my-4' />
            <CSVUploadForm onUpload={handleEEICLAFileUpload} label={text.EEICLADataLebel} />
            <hr className='border-t-2 w-full my-4' />
            <CSVUploadForm onUpload={handleHHPoHTFileUpload} label={text.HHPoHTDataLabel} />
          </div>
        </div>
      )}

    </>
  );
}

const WrappedAdminDashboard = () => (
  <AuthContext>
    <AdminDashboard />
  </AuthContext>
);

export default WrappedAdminDashboard;
