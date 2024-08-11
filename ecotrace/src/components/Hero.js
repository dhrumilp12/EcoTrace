import React from 'react';
import { GetReports } from '../components';

const Hero = () => {
  return (
    <header  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.4) 100%),linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', padding: '20px'}}>
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold">Welcome to EcoTrace</h1>
          <p className="text-[#071108] text-xl font-['Work_Sans'] col-span-3">Empowering communities to report and track environmental issues.</p>
          
          <div className="flex justify-start items-center flex-row gap-5 py-8 w-auto h-[80px]">
            <a
              href="/report"
              className="flex justify-center items-center py-2 px-[30px] rounded-[20px]"
              style={{
                background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%), linear-gradient(0deg, #060D07 0%, #060D07 100%)',
                textDecoration: 'none'
              }}
            >
              <p className="text-[#A6DE14] text-xl font-semibold">Report issues</p>
            </a>
            <a
              href="/about"
              className="flex justify-center items-center py-2 px-[30px] rounded-[20px]"
              style={{
                background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%), linear-gradient(0deg, #060D07 0%, #060D07 100%)',
                textDecoration: 'none'
              }}
            >
              <p className="text-[#A6DE14] text-xl font-semibold">About Us</p>
            </a>
        </div>
        
        
        <section className="mt-12">
        <span className="text-[#000000] text-[32px] font-['Source_Serif_4'] font-medium col-span-1">Recent Reports Near You</span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1" style={{ maxHeight: '60vh', overflow: 'auto' }}>
          <GetReports/>
          </div>
        </section>
        </div>
      </header>

  );
};

export default Hero;