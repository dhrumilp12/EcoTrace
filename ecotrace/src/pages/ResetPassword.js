import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Logo } from '../components';

const ResetPassword = ({ match }) => {// Using match to get the token from URL params if using React Router
  const { token } = useParams();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: passwords.password })
      });

      if (!response.ok) {
        throw new Error('Failed to reset password.');
      }

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-[#071108] min-h-screen flex flex-col items-center justify-center py-8 px-6">
      <div className="absolute top-4 right-4">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="rounded-[20px] shadow-[_0px_4px_4px_0px_rgba(0,0,0,0.25)] col-span-6 p-8 bg-white" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%),linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)' }}>
        <h1 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={passwords.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px]"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px]"
            required
          />
          <button type="submit" className="w-full p-3 px-[20px] bg-[#A6DE14] col-span-2 rounded-lg text-black font-semibold hover:bg-[#1D1D1D] hover:text-white" >
            Reset Password
          </button>
        </form>
        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
        <div className="text-center mt-4">
          <span>Remember your password?</span> 
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
