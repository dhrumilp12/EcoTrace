import React from 'react';
import { Logo } from '../assets';
import { Ellipse, PrimaryBTN, SecondaryBTN } from '../components';

const Landing = () => {
  return (
    <div className="bg-[#071108] min-h-screen flex flex-col justify-center items-center relative">
      <div className="relative text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 flex items-center justify-center">
            <Ellipse />
          </div>
          <img className="w-[300px] mx-auto mb-6 relative" src={Logo} alt="logo" />
        </div>
        <span className="text-[#F6FCE9] text-[20px] block mb-4">
          One earth, one community
        </span>
        <span className="text-[#F6FCE9] text-[90px] font-bold leading-[65px] tracking-tighter block mb-4">
          Ecotrace
        </span>
      </div>
      <div className="py-3">
        <PrimaryBTN name="Sign in" to="/login" />
      </div>
      <div>
        <SecondaryBTN name="Create Account" to="/signup" />
      </div>
      <div className="py-3"></div>
    </div>
  );
};

export default Landing;