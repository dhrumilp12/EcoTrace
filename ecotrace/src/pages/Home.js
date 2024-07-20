import React from 'react';
import { Hero } from '../components';

const Home = () => {
  return (
    <div className="bg-white">
     <Hero/>

      <main className="container px-4 py-12 mx-auto">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold">Our Mission</h2>
          <p className="text-lg text-gray-700">
            EcoTrace leverages citizen science to gather data, raise awareness, and foster community action towards environmental conservation and sustainability.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 mb-12 text-center md:grid-cols-3">
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

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-center">Recent Reports</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold">Pollution in River</h3>
              <p className="mb-4 text-gray-700">Reported by Jane Doe on July 18, 2024</p>
              <a href="/track" className="font-semibold text-green-600 hover:underline">View Details</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold">Illegal Dumping</h3>
              <p className="mb-4 text-gray-700">Reported by John Smith on July 17, 2024</p>
              <a href="/track" className="font-semibold text-green-600 hover:underline">View Details</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-xl font-bold">Deforestation</h3>
              <p className="mb-4 text-gray-700">Reported by Mary Johnson on July 16, 2024</p>
              <a href="/track" className="font-semibold text-green-600 hover:underline">View Details</a>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-3xl font-semibold">Community Impact</h2>
          <p className="mb-8 text-lg text-gray-700">Join thousands of others who are making a difference in their communities by using EcoTrace.</p>
          <a
            href="/about"
            className="px-6 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-md hover:bg-green-700"
          >
            Learn More
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;