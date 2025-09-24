import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubNav from "./sub-nav";

const API_URL = "https://nestjs.nonprod.au.livepro.com.au/customers";

const ClientInfo = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, []);

  const handleMoreInfo = (client) => {
    setSelectedClient(client);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setSelectedClient({ ...selectedClient, [e.target.name]: e.target.value });
  };

  // 🔹 Save client updates
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/${selectedClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedClient),
      });

      if (!res.ok) throw new Error("Failed to update client");

      const updatedClients = clients.map((c) =>
        c.id === selectedClient.id ? selectedClient : c
      );
      setClients(updatedClients);
      setSelectedClient(null);
    } catch (err) {
      console.error("Error updating client:", err);
    }
  };

  // 🔹 Delete client
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      const res = await fetch(`${API_URL}/${selectedClient.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete client");

      const updatedClients = clients.filter((c) => c.id !== selectedClient.id);
      setClients(updatedClients);
      setSelectedClient(null);
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  const closeModal = () => setSelectedClient(null);

  return (
    <div className="dashboard-page client-info-page">
      {/* 🔝 Main Navbar */}
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back
          </button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Client Info</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      {/* 🔽 Sub Navbar */}
      <SubNav />

      {/* 📄 Page Content */}
      <div className="page-content">
        <div className="client-info-table-wrapper">
          <table className="client-info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Account</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="5">No clients found.</td>
                </tr>
              ) : (
                clients.map((client, idx) => (
                  <tr key={idx} className="hover-row">
                    <td>{client.name}</td>
                    <td>{client.endpoint}</td>
                    <td>{client.region}</td>
                    <td>{client.account}</td>
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

      {/* 🔹 Popup */}
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
                    name="endpoint"
                    value={selectedClient.endpoint}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Country*</label>
                  <input
                    type="text"
                    name="region"
                    value={selectedClient.region}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Account*</label>
                  <input
                    type="text"
                    name="account"
                    value={selectedClient.account}
                    onChange={handleInputChange}
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
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;
