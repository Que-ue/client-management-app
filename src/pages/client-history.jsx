import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientHistory = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/clients')}>Back</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Client History</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      <div className="page-content">
        <div className="client-history-wrapper">
          <table className="client-history-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Company</th>
                <th>Contract Start</th>
                <th>Contract End</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="4">No client history available.</td>
                </tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.company || '-'}</td>
                    <td>{client.startDate || '-'}</td>
                    <td>{client.endDate || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientHistory;
