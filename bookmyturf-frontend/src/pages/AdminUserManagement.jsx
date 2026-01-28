import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your Spring Boot API
    axios.get("http://localhost:8080/api/users/all")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  return (
    <div style={container}>
      <h2>👥 User Management</h2>
      <p>View and manage all registered Players and Turf Owners.</p>
      
      <table style={tableStyle}>
        <thead>
          <tr style={{backgroundColor: '#eee'}}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userID} style={trStyle}>
              <td>{user.userID}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.emailAddress}</td>
              <td>{user.userType.typeName}</td>
              <td>{user.cityName}</td>
              <td>
                <span style={user.accountStatus === 'Active' ? activeLabel : suspendedLabel}>
                  {user.accountStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const container = { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const trStyle = { borderBottom: '1px solid #ddd', textAlign: 'left', height: '45px' };
const activeLabel = { color: '#27ae60', fontWeight: 'bold' };
const suspendedLabel = { color: '#e74c3c', fontWeight: 'bold' };

export default AdminUserManagement;