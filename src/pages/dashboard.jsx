import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav">
        <div className="nav-left">
          <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
        </div>
        <div className="nav-center">
          <h2 className="dashboard-title">Dashboard</h2>
        </div>
        <div className="nav-right"></div>
      </div>

      <div className="page-content">
        <div className="block-row">
          {/* 🔥 Client box now opens Add Client directly */}
          <div className="block" onClick={() => navigate('/add-client')}>Client</div>
          
          {/* Miscellaneous stays the same */}
          <div className="block" onClick={() => navigate('/miscellaneous')}>Miscellaneous</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
