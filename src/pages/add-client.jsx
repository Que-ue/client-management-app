// AddClient.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from './sub-nav';

const API_URL = "https://nestjs.nonprod.au.livepro.com.au/customers";

const AddClient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    environment: '',
    clientUrlPrefix: '',
    clientUrlDomain: '@livepro.com.au',
    name: '',
    region: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 🔹 Map environment to account
  const getAccountByEnvironment = (env) => {
    switch (env) {
      case "Production-1": return "5716008544";
      case "Production-2": return "5716008533";
      case "Staging": return "5716008522";
      case "Develop": return "5716008511";
      default: return "";
    }
  };

  const getDomainOptions = (env) => {
    switch (env) {
      case 'Production-1':
      case 'Production-2':
        return ['@livepro.com.au', '@livepro.com', '@livepro.au'];
      case 'Staging':
        return ['@livepro.com.au', '@livepro.au'];
      case 'Develop':
        return ['@livepro.com.au', '@nonprod.au.livepro.com.au'];
      default:
        return ['@livepro.com.au'];
    }
  };

  // auto set region for Staging / Develop
  useEffect(() => {
    if (formData.environment === 'Staging' || formData.environment === 'Develop') {
      setFormData((prev) => ({ ...prev, region: 'sydney' }));
    } else {
      setFormData((prev) => ({ ...prev, region: '' }));
    }
  }, [formData.environment]);

  // default name = prefix
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: prev.clientUrlPrefix || prev.name,
    }));
  }, [formData.clientUrlPrefix]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullEmail = `${formData.clientUrlPrefix}${formData.clientUrlDomain}`;
    const account = getAccountByEnvironment(formData.environment);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          endpoint: fullEmail,
          region: formData.region,
          account: account, // ✅ sending account now
        }),
      });

      if (!response.ok) throw new Error("Failed to add client");

      setSuccessMessage("Client added successfully!");
      setErrorMessage('');
      setFormData({
        environment: '',
        clientUrlPrefix: '',
        clientUrlDomain: '@livepro.com.au',
        name: '',
        region: '',
      });

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

      <div className="form-wrapper">
        <form className="add-client-form" onSubmit={handleSubmit}>

          {/* Environment Dropdown */}
          <div className="form-group">
            <label>Environment*</label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              required
            >
              <option value="">Select Environment</option>
              <option value="Production-1">Production-1</option>
              <option value="Production-2">Production-2</option>
              <option value="Staging">Staging</option>
              <option value="Develop">Develop</option>
            </select>
          </div>

          {/* Client_URL (Prefix + Domain) */}
          <div className="form-group">
            <label>Client_URL*</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                name="clientUrlPrefix"
                placeholder="Enter client"
                value={formData.clientUrlPrefix}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <select
                name="clientUrlDomain"
                value={formData.clientUrlDomain}
                onChange={handleChange}
                style={{ flex: 1.2 }}
              >
                {getDomainOptions(formData.environment).map((domain, idx) => (
                  <option key={idx} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Client Name */}
          <div className="form-group">
            <label>Client Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Region Dropdown */}
          <div className="form-group">
            <label>Region*</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Select Region</option>
              <option value="sydney">sydney</option>
              <option value="london">london</option>
              <option value="virginia">virginia</option>
            </select>
          </div>

          <div className="center-button">
            <button type="submit">Add Client</button>
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddClient;
