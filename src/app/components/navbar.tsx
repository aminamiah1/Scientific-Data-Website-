'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsFillMoonFill, BsPersonAdd, BsPersonX } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { PiSignIn, PiSignOut } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import AuthContext from '../utils/authContext';
import { useSession } from 'next-auth/react';

const DarkModeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }

  return (
    <button
      data-testid='dark-mode-toggle'
      className='text-2xl text-gray-800 hover:text-blue-600 dark:hover:text-green-400'
      onClick={toggleDarkMode}
    >
      <BsFillMoonFill />
    </button>
  )
}

const Navbar = () => {
  const { status } = useSession();

  return (
    <div className='w-full h-20 lg:h-28 border-b border-gray-300 bg-white shadow-md dark:bg-slate-600'>
      <div className='max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between'>
        <Link href='/' data-cy='nav-home'>
          <Image src='/images/logo.png' alt='bug' width={100} height={100} />
        </Link>
        <ul className='hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-medium text-gray-600'>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link href='/' data-cy='nav-home'>
              Home
            </Link>
          </li>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link href='/heat-demand' data-cy='nav-heat-demand'>
              Heat Demand
            </Link>
          </li>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link href='/breakdown/heat' data-cy='nav-breakdown-heat'>
              Breakdown of Heat
            </Link>
          </li>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link href='/breakdown/energy' data-cy='nav-breakdown-energy'>
              Breakdown of Energy
            </Link>
          </li>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link
              href='/half-hourly/gas-boilers'
              data-cy='nav-half-hourly-gas-boilers'
            >
              Half Hourly - Gas Boilers
            </Link>
          </li>
          <li className='hover:text-blue-600 dark:text-gray-200 dark:hover:text-green-400'>
            <Link
              href='/half-hourly/resistance-heaters'
              data-cy='nav-half-hourly-resistance-heaters'
            >
              Half Hourly - Resistance Heaters
            </Link>
          </li>
        </ul>
        <div className='flex gap-4 lg:gap-8 items-center '>
          {status === 'authenticated' && (
            <div className='flex gap-6 text-2xl border border-2 rounded-3xl p-4 ml-16'>
              <Link data-cy='dashboard-icon-link' href={'/admin/dashboard'}>
                <RxDashboard className='text-gray-800 cursor-pointer hover:text-blue-600 dark:text-white dark:hover:text-green-400' />
              </Link>
              <Link data-cy='add-admin-icon-link' href={'/admin/add-admins'}>
                <BsPersonAdd className='text-gray-800 cursor-pointer hover:text-blue-600 dark:text-white dark:hover:text-green-400' />
              </Link>
              <Link data-cy='delete-admin-icon-link' href={'/admin/delete-admins'}>
                <BsPersonX className='text-gray-800 cursor-pointer hover:text-blue-600 dark:text-white dark:hover:text-green-400' />
              </Link>
            </div>
          )}
          <div>
            <DarkModeToggle />
          </div>
          <div className='relative'>
            {status !== 'authenticated' && (
              <Link href={'/api/auth/signin'}>
                <PiSignIn className='text-3xl text-gray-800 cursor-pointer hover:text-blue-600 dark:hover:text-green-400' />
              </Link>
            )}
            {status === 'authenticated' && (
              <Link href={'/api/auth/signout'}>
                <PiSignOut className='text-3xl text-gray-800 cursor-pointer hover:text-blue-600 dark:hover:text-green-400' />
              </Link>
            )}
          </div>
          <FiMenu className='text-3xl lg:hidden text-gray-800 hover:text-blue-600 dark:hover:text-green-400' />
        </div>
      </div>
    </div>
  );
}

const WrappedNavbar = () => {
  return (
    <AuthContext>
      <Navbar />
    </AuthContext>
  );
}

export default WrappedNavbar;
