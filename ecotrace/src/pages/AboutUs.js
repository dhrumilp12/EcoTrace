import React from 'react';

const AboutUs = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-bold">About Us</h2>
        <p className="mb-4 text-gray-700">
          EcoTrace is a web-based platform dedicated to empowering communities to take action on environmental issues. Our mission is to provide a space where individuals can report, track, and raise awareness about environmental problems such as pollution, deforestation, and illegal dumping.
        </p>
        <p className="mb-4 text-gray-700">
          We believe that by leveraging citizen science and community engagement, we can foster a greater sense of responsibility and drive meaningful change. Our platform offers a user-friendly interface for reporting issues, tracking their progress, and staying informed about environmental challenges in your area.
        </p>
        <h3 className="mb-2 text-2xl font-semibold">Our Mission</h3>
        <p className="mb-4 text-gray-700">
          Our mission is to enhance environmental conservation and sustainability by bridging the gap between citizens and local authorities. We strive to create a more informed and active community that can effectively address environmental concerns.
        </p>
        <h3 className="mb-2 text-2xl font-semibold">Get Involved</h3>
        <p className="mb-4 text-gray-700">
          We welcome everyone to join us in making a difference. Here’s how you can get involved:
        </p>
        <ul className="pl-5 mb-4 text-gray-700 list-disc">
          <li className="mb-2">Report environmental issues you encounter.</li>
          <li className="mb-2">Track the status of reported issues and follow their progress.</li>
          <li className="mb-2">Share your experiences and spread awareness about EcoTrace in your community.</li>
        </ul>
        <p className="text-gray-700">
          Together, we can create a cleaner, healthier environment for future generations. Thank you for being a part of the EcoTrace community!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;