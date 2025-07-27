import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matched = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (matched) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setMessage('Incorrect email or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome back</h2>
        <p className="subtitle">Please login to continue</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p className="signup-link">
          Not a member? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
