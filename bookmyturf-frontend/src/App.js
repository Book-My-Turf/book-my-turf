import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashBoard from './pages/AdminDashBoard';
import AdminUserManagement from './pages/AdminUserManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        
        {/* You can add TurfOwner and Player routes here later */}
      </Routes>
    </Router>
  );
}

export default App;