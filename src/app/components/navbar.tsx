import React from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-96 bg-banner-bg">
    <div className="w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-black lg:text-white bg-white lg:bg-transparent">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <h1 className="text-black uppercase font-bold">logo</h1>
        <ul className="text-[13px] hidden lg:flex items-center gap-8 uppercase text-black font-bold">
          <li className="hover:text-[#FED136]">
            <Link href="/" data-cy="nav-home">Home</Link>
          </li>
          <li className="hover:text-[#FED136]">
            <Link href="/heat-demand" data-cy="nav-heat-demand">Heat Demand</Link>
          </li>
          <li className="hover:text-[#FED136]">
            <Link href="/breakdown/heat" data-cy="nav-breakdown-heat">Breakdown OF Heat</Link>
          </li>
          <li className="hover:text-[#FED136]">
            <Link href="/breakdown/energy" data-cy="nav-breakdown-energy">Breakdown OF Energy</Link>
          </li>
          <li className="hover:text-[#FED136]">
            <Link href="/half-hourly/gas-boilers" data-cy="nav-half-hourly-gas-boilers">Half hourly - Gas Boilers</Link>
          </li>
          <li className="hover:text-[#FED136]">
            <Link href="/half-hourly/resistance-heaters" data-cy="nav-half-hourly-resistance-heaters">Half hourly - Resistance Heaters</Link>
          </li>
        </ul>
        <div className="flex gap-8 items-center">
          <BsFillMoonFill className="text-black" />
          <div className="relative">
            <CgProfile className="text-black" />
            <span className="w-4 h-4 bg-yellow-600 text-white rounded-full absolute -top-2 -right-2 text-xs flex items-center justify-center">
              0
            </span>
          </div>
        </div>
        <FiMenu className="text-3xl lg:hidden" />
      </div>
    </div>
    </div>
  );
};

export default Navbar;
