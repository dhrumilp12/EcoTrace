import React from 'react';
import { about, mission, involved } from '../assets';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-white pb-20">
      <div className="flex flex-wrap justify-center items-start max-w-4xl">
        {/* About us Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-dark rounded-[20px] p-6 text-white" style={{ background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)' }}>
            <h2 className="text-3xl font-bold mb-3">About us</h2>
            <p>EcoTrace is a web-based platform dedicated to empowering communities to take action on environmental issues. We aim to provide a space where individuals can report, track, and raise awareness about environmental problems such as pollution, deforestation, and illegal dumping.</p>
            <p>We believe that by leveraging citizen science and community engagement, we can foster a greater sense of responsibility and drive meaningful change.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <img className="max-w-xs" src={about} alt="About us" />
        </div>

        {/* Mission Section */}
        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <img className="max-w-xs" src={mission} alt="Our Mission" />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-light rounded-[20px] p-6" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.4) 100%),linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
            <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
            <p>Our mission is to enhance environmental conservation and sustainability by bridging the gap between citizens and local authorities. We strive to create a more informed and active community that can effectively address environmental concerns.</p>
          </div>
        </div>

        {/* Get Involved Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-dark rounded-[20px] p-6 text-white" style={{ background: 'linear-gradient(319deg, rgba(168,203,77,0) 0%, rgba(168,203,77,0.15) 100%),linear-gradient(0deg, #060D07 0%, #060D07 100%)' }}>
            <h2 className="text-3xl font-bold mb-3">Get Involved</h2>
            <p>We welcome everyone to join us in making a difference. Here’s how you can get involved:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Report environmental issues you encounter.</li>
              <li>Track the status of reported issues and follow their progress.</li>
              <li>Share your experiences and spread awareness about EcoTrace in your community.</li>
            </ul>
            <p>Together, we can create a cleaner, healthier environment for future generations. Thank you for being a part of the EcoTrace community!</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <img className="max-w-xs" src={involved} alt="Get Involved" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
