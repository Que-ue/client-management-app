import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const DeleteClient = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleCheckboxChange = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const deleteClient = (email) => {
    const updated = clients.filter(client => client.email !== email);
    localStorage.setItem('clients', JSON.stringify(updated));
    setClients(updated);
    setSelectedEmails(selectedEmails.filter(e => e !== email));
  };

  const deleteSelected = () => {
    const updated = clients.filter(client => !selectedEmails.includes(client.email));
    localStorage.setItem('clients', JSON.stringify(updated));
    setClients(updated);
    setSelectedEmails([]);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/clients')}>Back</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Delete Client</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      <div className="page-content">
        <div className="delete-client-wrapper">
          <table className="delete-client-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr><td colSpan="6">No clients found.</td></tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(client.email)}
                        onChange={() => handleCheckboxChange(client.email)}
                      />
                    </td>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.company || '-'}</td>
                    <td>
                      <FiTrash2
                        className="trash-icon"
                        onClick={() => deleteClient(client.email)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {selectedEmails.length > 0 && (
            <div className="center-button">
              <button onClick={deleteSelected} className="bulk-delete-btn">
                Delete Selected Clients
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteClient;
