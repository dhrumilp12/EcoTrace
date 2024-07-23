import React from 'react';
import { Logo, Logo_ } from '../assets';
import { Ellipse, Logo as ComponentLogo, PrimaryBTN, SecondaryBTN } from '../components';

const Landing = () => {
  return (
    <div className="bg-[#071108] min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-4 right-4">
        <ComponentLogo />
      </div>
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
        {/* <div className="flex items-center justify-center">
          <span className="text-[#F6FCE9] text-[90px] font-bold leading-[65px] tracking-tighter block mb-4">
            Ec
          </span>
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center mx-2 mb-4">
            <img src={Logo_} className="object-cover w-full h-full" alt="logo" />
          </div>
          <span className="text-[#F6FCE9] text-[90px] font-bold leading-[65px] tracking-tighter block mb-4">
            trace
          </span>
        </div> */}
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