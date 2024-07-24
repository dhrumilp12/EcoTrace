import React, { useState } from 'react';
import { Back, Logo } from '../components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful');
        // Store the token or further navigation
        localStorage.setItem('token', data.token);
        // Redirect to home or dashboard as needed
        window.location.href = '/dashboard';  // Adjust as needed
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen py-8 px-9 bg-[#071108] text-center'>
      <Header />
      <div
        className="rounded-[20px] shadow-[0px_3px_6px_0px_rgba(206,206,206,0.63)] col-span-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%), linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='px-9 py-9'>
          <span className="block mb-6 text-2xl text-black">
            Create an account! ✍️
          </span>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Retype Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className='py-6 flex justify-center items-center'>
              <button
                type="submit"
                className="flex font-bold justify-center items-center flex-row gap-2.5 py-2.5 px-[30px] bg-[#A6DE14] rounded-[10px] col-span-5 text-black font-work_sans hover:bg-[#1D1D1D] hover:text-white"
              >
                Create Account
              </button>
            </div>
          </form>
          {message && <p className="text-red-500 text-center mt-4">{message}</p>}
          <div className='py-4'>
            <span className="text-black work_sans">
              Already have an account?
            </span>
            <Link to="/login" className="text-black work_sans font-bold leading-[1.22] tracking-[-0.32px] hover:underline">
              {" "}Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
