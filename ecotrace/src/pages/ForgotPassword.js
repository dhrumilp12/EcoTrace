import React, { useState } from 'react';
import { Logo_ } from '../assets';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await fetch(`auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      const result = await response.text(); // Assuming the response is just plain text
      setMessage(result);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-[#071108] min-h-screen flex flex-col items-center justify-center py-8 px-6">
      <div className="absolute top-4 right-4">
        <img src={Logo_} className="h-[90px] rounded-lg" alt="logo" />
      </div>
      <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-[#071108] text-3xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 mb-4 border border-[#7B7B7B] rounded-lg text-black bg-transparent outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 px-[20px] bg-[#A6DE14] col-span-2 rounded-lg text-black font-semibold hover:bg-[#1D1D1D] hover:text-white"
          >
            Send Password Reset Email
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
