import React, { useEffect } from 'react';
import { Logo, Logo_ } from '../assets';
import { Ellipse, Logo as ComponentLogo, PrimaryBTN, SecondaryBTN, GoogleLoginBTN } from '../components';
import { useLocation } from 'react-router-dom';

const Landing = () => {
  const location = useLocation();

    useEffect(() => {
        // Function to parse query parameters
        const parseQuery = (query) => {
            return query.slice(1).split('&')
                .map(param => param.split('='))
                .reduce((values, [key, value]) => {
                    values[key] = value;
                    return values;
                }, {});
        };

        const queryParameters = parseQuery(location.search);
        if (queryParameters.token) {
            localStorage.setItem('token', queryParameters.token);
            // Redirect user or do other tasks after login
        }
    }, [location]);
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
      <div className="py-3">
        <GoogleLoginBTN />
      </div>
    </div>
  );
};

export default Landing;