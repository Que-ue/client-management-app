import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from './sub-nav';

const API_URL = "https://nestjs.nonprod.au.livepro.com.au/customers";

const AddClient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    account: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Email domain check
    if (!formData.email.endsWith("@livepro.com.au")) {
      setErrorMessage("Only @livepro.com.au emails are allowed!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          endpoint: formData.email,  // API expects "endpoint" instead of email
          region: formData.region,
          account: formData.account
        })
      });

      if (!response.ok) throw new Error("Failed to add client");

      setSuccessMessage("Client added successfully!");
      setErrorMessage('');
      setFormData({ name: '', email: '', region: '', account: '' });

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage("Error adding client.");
    }
  };

  return (
    <div className="dashboard-page add-client-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>Back</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Add Client</h2>
        </div>
      </div>

      <SubNav />

      <div className="page-content">
        <div className="form-wrapper">
          <form className="add-client-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Client Name*</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Country*</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Account*</label>
                <input type="text" name="account" value={formData.account} onChange={handleChange} required />
              </div>
            </div>

            <div className="center-button">
              <button type="submit">Add Client</button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
