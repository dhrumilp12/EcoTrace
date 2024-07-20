import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-2xl font-bold text-white">EcoTrace</a>
            <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} EcoTrace. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="text-sm text-gray-400 hover:text-white">About Us</a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Made with <span className="text-red-500">❤️</span> for Hacktivism
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Follow us on
            <a href="https://twitter.com" className="ml-1 text-gray-400 hover:text-white">Twitter</a>,
            <a href="https://facebook.com" className="ml-1 text-gray-400 hover:text-white">Facebook</a>, and
            <a href="https://instagram.com" className="ml-1 text-gray-400 hover:text-white">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;