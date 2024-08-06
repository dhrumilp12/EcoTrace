import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Header from '../components/Header';

const Login = () => {
  const [loginData, setLoginData] = useState({
    login: '',  // Can be username or email
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: loginData.login,
          password: loginData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
        // Store the token or further navigation
        localStorage.setItem('token', data.token);
        // Redirect to home or dashboard as needed
        window.location.href = '/home';  // Adjust as needed
      } else {
        throw new Error(data.message || "Invalid credentials");
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
          <span className="col-span-3 text-2xl text-black">
            Welcome back! 🏠
          </span>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="login"
              placeholder="Username or Email"
              value={loginData.login}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            <Link to="/forgot-password">
              <span className="text-black underline work_sans">
                Forgot your password?
              </span>
            </Link>
            <div className='py-6 flex justify-center items-center'>
              <button
                type="submit"
                className="flex font-bold justify-center items-center flex-row gap-2.5 py-2.5 px-[30px] bg-[#A6DE14] rounded-[10px] col-span-5 text-black font-work_sans hover:bg-[#1D1D1D] hover:text-white"
              >
                Log In
              </button>
            </div>
          </form>
          {message && <p className="text-red-500 text-center mt-4">{message}</p>}
          <div className='py-4'>
            <span className="text-black work_sans">
              Don't have an account?
            </span>
            <Link to="/signup" className="text-black work_sans font-bold leading-[1.22] tracking-[-0.32px] hover:underline">
              {" "}Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
