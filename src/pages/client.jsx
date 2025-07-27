import React from 'react';
import { useNavigate } from 'react-router-dom';

const Client = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>Back</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Client</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      <div className="page-content">
        <div className="client-grid">
          <div className="client-box" onClick={() => navigate('/add-client')}>
            Add Client
          </div>
          <div className="client-box" onClick={() => navigate('/client-history')}>
            Client's History
          </div>
          <div className="client-box" onClick={() => navigate('/client-info')}>
            Client Info
          </div>
          <div className="client-box" onClick={() => navigate('/delete-client')}>
            Delete Client
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
