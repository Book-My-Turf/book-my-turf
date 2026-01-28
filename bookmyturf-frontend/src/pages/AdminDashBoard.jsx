import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    navigate('/');
  };

  return (
    <div style={dashboardLayout}>
      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <h2 style={{color: '#fff', textAlign: 'center'}}>Admin Panel</h2>
        <hr style={{borderColor: '#444'}} />
        <nav style={navStyle}>
          <Link to="/admin" style={linkStyle}>🏠 Dashboard Home</Link>
          <Link to="/admin/users" style={linkStyle}>👥 User Management</Link>
          <Link to="/admin/turfs" style={linkStyle}>🏟️ Turf Approvals</Link>
        </nav>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <h3>Welcome, {activeUser?.firstName || 'Admin'}</h3>
          <span style={statusBadge}>System Online</span>
        </header>
        
        <div style={{padding: '20px'}}>
          {/* This renders the child routes like AdminUserManagement */}
          <Outlet /> 
          
          {/* Default view if no child route is active */}
          {!window.location.pathname.includes('users') && (
            <div style={statsGrid}>
              <div style={card}><h4>Active Users</h4><p>24</p></div>
              <div style={card}><h4>Total Bookings</h4><p>156</p></div>
              <div style={card}><h4>Revenue</h4><p>₹45,000</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const dashboardLayout = { display: 'flex', height: '100vh', backgroundColor: '#f4f7f6' };
const sidebarStyle = { width: '250px', backgroundColor: '#2c3e50', padding: '20px', display: 'flex', flexDirection: 'column' };
const navStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px', flex: 1 };
const linkStyle = { color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', fontWeight: '500' };
const mainContentStyle = { flex: 1, overflowY: 'auto' };
const headerStyle = { backgroundColor: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const logoutBtn = { padding: '10px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const statusBadge = { backgroundColor: '#2ecc71', color: '#fff', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' };
const statsGrid = { display: 'flex', gap: '20px', marginTop: '20px' };
const card = { flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' };

export default AdminDashBoard;