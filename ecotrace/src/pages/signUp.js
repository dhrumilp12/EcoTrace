import React, { useState } from 'react';
import { Back, Logo } from '../components';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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
      alert("Passwords do not match");
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
        alert('Registration successful');
        // Redirect or additional actions
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='min-h-screen py-8 px-9'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <Back />
        </div>
        <div className='flex items-center'>
          <Logo />
        </div>
      </div>
      <div
        className="rounded-[20px] shadow-[0px_3px_6px_0px_rgba(206,206,206,0.63)] col-span-6"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(190,201,161,0.72) 100%), linear-gradient(0deg, #E1E0EC 0%, #E1E0EC 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='px-9 py-9'>
          <span className="text-[#071108] text-2xl block mb-6">
            Create an account! ✍️
          </span>
          <form onSubmit={handleSubmit}>
            <div className='py-4'>
              <div className="flex justify-start items-center flex-row gap-2.5 py-2.5 px-[20px] bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px] col-span-5">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="flex-1 text-[#7B7B7B] work_sans bg-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className='py-4'>
              <div className="flex justify-start items-center flex-row gap-2.5 py-2.5 px-[20px] bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px] col-span-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 text-[#7B7B7B] work_sans bg-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className='py-4'>
              <div className="flex justify-start items-center flex-row gap-2.5 py-2.5 px-[20px] bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px] col-span-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 text-[#7B7B7B] work_sans bg-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className='py-4'>
              <div className="flex justify-start items-center flex-row gap-2.5 py-2.5 px-[20px] bg-[#F7F7F7] border-solid border-[#7B7B7B] border rounded-[10px] col-span-5">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="flex-1 text-[#7B7B7B] work_sans bg-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className='py-6'>
              <button
                type="submit"
                className="flex justify-center items-center flex-row gap-2.5 py-2.5 px-[30px] bg-[#071108] rounded-[10px] col-span-5 text-[#E4E3EE] font-work_sans"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className='py-4'>
            <span className="text-[#071108] font-['Work_Sans']">
              Already have an account?
            </span>
            <Link to="/login" className="text-[#071108] font-['Work_Sans'] font-bold leading-[1.22] tracking-[-0.32px]">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
