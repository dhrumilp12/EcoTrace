import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaHome, FaExclamationCircle, FaSearch, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">EcoTrace</a>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="/" className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700">
              <FaHome className="mr-2" />
              Home
            </a>
            <a href="/report" className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700">
              <FaExclamationCircle className="mr-2" />
              Report Issue
            </a>
            <a href="/track" className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700">
              <FaSearch className="mr-2" />
              Track Issues
            </a>
            <a href="/about" className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700">
              <FaInfoCircle className="mr-2" />
              About Us
            </a>
            <a href="/contact" className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700">
              <FaEnvelope className="mr-2" />
              Contact
            </a>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-green-700 focus:outline-none"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
          <div className="relative hidden sm:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-700"
            >
              <FaUserCircle className="mr-2" />
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Home</a>
            <a href="/report" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Report Issue</a>
            <a href="/track" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Track Issues</a>
            <a href="/about" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">About Us</a>
            <a href="/contact" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Contact</a>
            <a href="/profile" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Your Profile</a>
            <a href="/settings" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Settings</a>
            <a href="/logout" className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700">Sign Out</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;