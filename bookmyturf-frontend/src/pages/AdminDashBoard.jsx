import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
  const navigate = useNavigate();

  // Styles
  const statsContainer = { display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' };
  const cardStyle = { 
    flex: '1', 
    minWidth: '200px', 
    padding: '20px', 
    borderRadius: '12px', 
    color: 'white', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };
  const menuCard = {
    padding: '30px',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: '0.3s',
    textAlign: 'center',
    width: '250px'
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>BookMyTurf Admin Portal</h2>
        <button onClick={() => navigate('/')} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* Quick Stats Bar (Requirement: Overview) */}
      <div style={statsContainer}>
        <div style={{ ...cardStyle, backgroundColor: '#3498db' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '28px', margin: '10px 0' }}>1,240</p>
        </div>
        <div style={{ ...cardStyle, backgroundColor: '#2ecc71' }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: '28px', margin: '10px 0' }}>₹85,400</p>
        </div>
        <div style={{ ...cardStyle, backgroundColor: '#f1c40f' }}>
          <h3>Active Turfs</h3>
          <p style={{ fontSize: '28px', margin: '10px 0' }}>42</p>
        </div>
        <div style={{ ...cardStyle, backgroundColor: '#e67e22' }}>
          <h3>Pending Approvals</h3>
          <p style={{ fontSize: '28px', margin: '10px 0' }}>5</p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div style={{ padding: '30px' }}>
        <h3>Management Modules</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          
          {/* USER MANAGEMENT - Links to the page we built earlier */}
          <div style={menuCard} onClick={() => navigate('/admin/users')} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
            <h4>User Management</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>Profiles, Bookings, & Status Control</p>
          </div>

          <div style={menuCard} onClick={() => alert('Turf Management coming soon!')}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏟️</div>
            <h4>Turf Management</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>Approve Turfs & Photo Gallery</p>
          </div>

          <div style={menuCard} onClick={() => alert('Financial Reports coming soon!')}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📈</div>
            <h4>Reports & Analytics</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>Revenue, Cancellations & Trends</p>
          </div>

          <div style={menuCard} onClick={() => alert('Support coming soon!')}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>💬</div>
            <h4>Communication</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>Send Notifications & Emails</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;