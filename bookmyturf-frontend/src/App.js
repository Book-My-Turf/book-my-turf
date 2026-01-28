import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashBoard from './pages/AdminDashBoard';
import AdminUserManagement from './pages/AdminUserManagement'; 
import PlayerDashboard from './pages/PlayerDashboard'; // Ensure the filename matches exactly

// You can create a separate file for OwnerDashboard later, 
// for now, we keep this placeholder
const OwnerDashboard = () => (
  <div style={{ padding: '40px' }}>
    <h1>Owner Dashboard</h1>
    <p>Owner-specific features coming soon.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        
        {/* Player/User Route - Points to your full dashboard code */}
        <Route path="/user-dashboard" element={<PlayerDashboard />} />
        
        {/* Owner Route */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />

        {/* Admin Section with Nested Routes */}
        <Route path="/admin" element={<AdminDashBoard />}>
          <Route path="users" element={<AdminUserManagement />} />
          {/* Future Admin routes like 'turfs' can go here */}
        </Route>

        {/* Fallback: Redirect any unknown URL to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;