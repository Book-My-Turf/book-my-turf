import React, { useState, useEffect } from 'react';

const AdminUserManagement = () => {
  // Local state for users (Mocking the database for now)
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // Initializing with sample data matching your SQL schema
  useEffect(() => {
    const sampleUsers = [
      { id: 1, firstName: 'Rahul', lastName: 'Kumar', email: 'rahul@example.com', phone: '9876543210', role: 'Player', status: 'Active', regDate: '2026-01-10' },
      { id: 2, firstName: 'Amit', lastName: 'Sharma', email: 'amit@owner.com', phone: '8888877777', role: 'Turf Owner', status: 'Active', regDate: '2026-01-15' },
      { id: 3, firstName: 'Admin', lastName: 'Main', email: 'admin@bookmyturf.com', phone: '9990009990', role: 'Admin', status: 'Active', regDate: '2026-01-01' },
    ];
    setUsers(sampleUsers);
  }, []);

  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    if (selectedUser && selectedUser.id === id) {
        setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  // Logic for search and filter
  const filteredUsers = users.filter(u => 
    (u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === '' || u.role === filterRole)
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <button onClick={() => window.history.back()} style={{marginBottom: '10px'}}>← Back to Dashboard</button>
      <h2>User Management</h2>

      {/* Filter Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Search Name or Email..." 
          style={{ padding: '8px', width: '250px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilterRole(e.target.value)} style={{ padding: '8px' }}>
          <option value="">All Roles</option>
          <option value="Player">Player</option>
          <option value="Turf Owner">Turf Owner</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Table Section */}
        <div style={{ flex: 2 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} border="1">
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td style={{ color: user.status === 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>{user.status}</td>
                  <td><button onClick={() => setSelectedUser(user)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selectedUser && (
          <div style={{ flex: 1, border: '1px solid #999', padding: '15px', borderRadius: '8px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>User Profile</h3>
                <button onClick={() => setSelectedUser(null)}>X</button>
            </div>
            <p><strong>Full Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Joined:</strong> {selectedUser.regDate}</p>
            <hr />
            <h4>Actions</h4>
            <button 
                onClick={() => handleStatusChange(selectedUser.id, selectedUser.status)}
                style={{
                    backgroundColor: selectedUser.status === 'Active' ? '#ff4d4d' : '#4CAF50',
                    color: 'white', border: 'none', padding: '10px', width: '100%', cursor: 'pointer'
                }}
            >
                {selectedUser.status === 'Active' ? 'Block User' : 'Unblock User'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;