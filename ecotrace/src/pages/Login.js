import React, { useState } from 'react';

const Login = () => {
  const [loginData, setLoginData] = useState({
    login: '',  // Can be username or email
    password: ''
  });

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
        alert('Login successful');
        // Store the token or further navigation
        localStorage.setItem('token', data.token);
        // Redirect to home or dashboard as needed
        window.location.href = '/dashboard';  // Adjust as needed
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Username or Email"
          value={loginData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;
