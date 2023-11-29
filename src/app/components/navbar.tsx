import React from 'react';
import Link from 'next/link';
import { BsFillMoonFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="w-full h-20 lg:h-28 border-b border-gray-300 bg-white shadow-md">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">logo</h1>
        <ul className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-medium text-gray-600">
          <li className="hover:text-blue-600">
            <Link href="/" data-cy="nav-home">Home</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/heat-demand" data-cy="nav-heat-demand">Heat Demand</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/breakdown/heat" data-cy="nav-breakdown-heat">Breakdown of Heat</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/breakdown/energy" data-cy="nav-breakdown-energy">Breakdown of Energy</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/half-hourly/gas-boilers" data-cy="nav-half-hourly-gas-boilers">Half Hourly - Gas Boilers</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="/half-hourly/resistance-heaters" data-cy="nav-half-hourly-resistance-heaters">Half Hourly - Resistance Heaters</Link>
          </li>
        </ul>
        <div className="flex gap-4 lg:gap-8 items-center">
          <BsFillMoonFill className="text-2xl text-gray-800 hover:text-blue-600" />
          <div className="relative">
          <Link href="/admin/sign-in">
              <CgProfile className="text-2xl text-gray-800 cursor-pointer hover:text-blue-600" />
            </Link>
          </div>
          <FiMenu className="text-3xl lg:hidden text-gray-800 hover:text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
