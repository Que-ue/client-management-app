import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import AddClient from './pages/add-client'; 
import ClientInfo from './pages/client-info';
import Miscellaneous from './pages/miscellaneous'; // ✅ New import
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/client-info" element={<ClientInfo />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} /> {/* ✅ Misc Route */}
      </Routes>
    </Router>
  );
}

export default App;
