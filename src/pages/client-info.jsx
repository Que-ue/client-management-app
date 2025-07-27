import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientInfo = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleMoreInfo = (client) => {
    setSelectedClient(client);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setSelectedClient({ ...selectedClient, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedClients = clients.map((client) =>
      client.email === selectedClient.email ? selectedClient : client
    );
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setClients(updatedClients);
    setSelectedClient(null);
  };

  const closeModal = () => {
    setSelectedClient(null);
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
          <h2 className="dashboard-title">Client Info</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      <div className="page-content">
        <div className="client-info-table-wrapper">
          <table className="client-info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="5">No clients added yet.</td>
                </tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={index} className="hover-row">
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.company}</td>
                    <td>
                      <button
                        className="more-info-btn"
                        onClick={() => handleMoreInfo(client)}
                      >
                        More Info
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedClient && (
        <div className="client-popup">
          <div className="popup-content">
            <h3>Client Details</h3>
            <form className="popup-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Client Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedClient.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={selectedClient.email}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={selectedClient.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={selectedClient.dob}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={selectedClient.company}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Assigned To</label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={selectedClient.assignedTo}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Contract Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={selectedClient.startDate}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Contract End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={selectedClient.endDate}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group address-full">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={selectedClient.address}
                    onChange={handleInputChange}
                    className="address-input"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </form>

            <div className="popup-buttons">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              ) : (
                <button onClick={handleSave}>Save</button>
              )}
              <button className="cancel-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;
