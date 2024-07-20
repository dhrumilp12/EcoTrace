import React from 'react';
import { Hero } from '../components';

const Landing = () => {
  return (
    <div className="bg-white">
      <Hero />

      <main className="container px-4 py-12 mx-auto">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold">Our Mission</h2>
          <p className="text-lg text-gray-700">
            EcoTrace leverages citizen science to gather data, raise awareness, and foster community action towards environmental conservation and sustainability.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="p-6 bg-green-100 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Report Issues</h3>
            <p className="mb-4 text-gray-700">Help us by reporting environmental issues in your area.</p>
            <a href="/report" className="font-semibold text-green-600 hover:underline">Learn More</a>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Track Progress</h3>
            <p className="mb-4 text-gray-700">Monitor the status of reported issues and see how they are being resolved.</p>
            <a href="/track" className="font-semibold text-green-600 hover:underline">Learn More</a>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Community Action</h3>
            <p className="mb-4 text-gray-700">Join community efforts to address and solve environmental problems.</p>
            <a href="/about" className="font-semibold text-green-600 hover:underline">Learn More</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;