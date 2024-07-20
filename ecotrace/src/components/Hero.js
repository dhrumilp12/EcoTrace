import React from 'react';

const Hero = () => {
  return (
    <header className="py-12 text-white bg-green-600">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold">Welcome to EcoTrace</h1>
          <p className="mb-8 text-xl">Empowering communities to report and track environmental issues.</p>
          <a
            href="/report"
            className="px-6 py-3 text-lg font-semibold text-green-600 transition bg-white rounded-md hover:bg-gray-200"
          >
            Get Started
          </a>
        </div>
      </header>
  );
};

export default Hero;