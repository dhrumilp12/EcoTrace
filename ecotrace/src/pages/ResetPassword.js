import React, { useState } from 'react';

const ResetPassword = ({ match }) => { // Using `match` to get the token from URL params if using React Router
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
      const response = await fetch(`auth/reset/${match.params.token}`, {
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
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={passwords.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
