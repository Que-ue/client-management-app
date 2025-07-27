import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((u) => u.email === email)) {
      setMessage('Email already exists.');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
    } else {
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Signup successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container signup">
        <h2>Signup</h2>
        <p className="subtitle">Create a new account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
        {message && <p>{message}</p>}
        <p className="signup-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
