import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    company: '',
    address: '',
    assignedTo: '',
    startDate: '',
    endDate: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    storedClients.push(formData);
    localStorage.setItem('clients', JSON.stringify(storedClients));
    setSuccessMessage('Client added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      company: '',
      address: '',
      assignedTo: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleBack = () => {
    navigate('/clients');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={handleBack}>Back</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Add New Client</h2>
        </div>
        <div className="nav-right"></div>
      </div>

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
                <label>Phone Number*</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Assigned To (Employee Name)</label>
                <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contract Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contract End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
              <div className="form-group address-full">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="address-input"
                />
              </div>
            </div>

            <div className="center-button">
              <button type="submit">Add Client</button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
