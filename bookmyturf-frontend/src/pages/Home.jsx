import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); 
  const [selectedRole, setSelectedRole] = useState(3); 

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',     
    password: '',
    contactPhoneNo: '',
    permanentAddress: '', // Correctly mapping to DB
    cityName: '',         
    zipCode: '',          // Added
    userType: { userTypeID: 3 } 
  });

  const getRoleName = (id) => {
    if (id === 1) return "Admin";
    if (id === 2) return "Turf Owner";
    return "Player";
  };

  const handleRoleChange = (roleId) => {
    const id = parseInt(roleId);
    setSelectedRole(id);
    setFormData({ ...formData, userType: { userTypeID: id } });
    if (id === 1) setView('login');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        emailAddress: loginData.email,
        password: loginData.password
      });

      const user = response.data;
      if (Number(user.userType.userTypeID) !== Number(selectedRole)) {
        alert(`Role mismatch. Logged in as ${getRoleName(user.userType.userTypeID)}`);
        return;
      }

      localStorage.setItem("activeUser", JSON.stringify(user));
      if (user.userType.userTypeID === 1) navigate('/admin');
      else if (user.userType.userTypeID === 2) navigate('/owner-dashboard');
      else navigate('/user-dashboard');

    } catch (error) {
      alert("Invalid credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      // formData now includes permanentAddress and zipCode
      await axios.post("http://localhost:8080/api/users/register", formData);
      alert("Registration Successful!");
      setView('login');
    } catch (error) {
      alert("Registration failed. Email might exist.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>🏟️ BookMyTurf</h2>
        <div style={roleBtnGroup}>
          {[3, 2, 1].map(id => (
            <button key={id} type="button" 
              style={selectedRole === id ? activeRoleBtn : roleBtn} 
              onClick={() => handleRoleChange(id)}>{getRoleName(id)}</button>
          ))}
        </div>

        {view === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <input style={inputStyle} type="email" placeholder="Email" required 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
            <input style={inputStyle} type="password" placeholder="Password" required 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            <button type="submit" style={btnPrimary}>Login</button>
            <p style={toggleTextStyle}>New? <span style={linkStyle} onClick={() => setView('register')}>Register</span></p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{display:'flex', gap:'5px'}}>
               <input style={inputStyle} placeholder="First Name" required 
                 onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
               <input style={inputStyle} placeholder="Last Name" required 
                 onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <input style={inputStyle} type="email" placeholder="Email" required 
              onChange={(e) => setFormData({...formData, emailAddress: e.target.value})} />
            <input style={inputStyle} placeholder="Phone" required 
              onChange={(e) => setFormData({...formData, contactPhoneNo: e.target.value})} />
            
            {/* PERMANENT ADDRESS FIELD */}
            <input 
              style={inputStyle} 
              placeholder="Permanent Address" 
              required 
              value={formData.permanentAddress}
              onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})} 
            />

            <div style={{display:'flex', gap:'5px'}}>
              <input style={inputStyle} placeholder="City" required 
                onChange={(e) => setFormData({...formData, cityName: e.target.value})} />
              
              {/* ZIP CODE FIELD */}
              <input 
                style={inputStyle} 
                placeholder="Zip Code" 
                required 
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})} 
              />
            </div>

            <input style={inputStyle} type="password" placeholder="Password" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
            
            <button type="submit" style={btnPrimary}>Register</button>
            <p style={toggleTextStyle}>Back to <span style={linkStyle} onClick={() => setView('login')}>Login</span></p>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' };
const cardStyle = { width: '400px', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' };
const headerStyle = { textAlign: 'center', marginBottom: '20px' };
const roleBtnGroup = { display: 'flex', gap: '10px', marginBottom: '20px' };
const roleBtn = { flex: 1, padding: '10px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '5px' };
const activeRoleBtn = { ...roleBtn, backgroundColor: '#28a745', color: '#fff' };
const inputStyle = { width: '100%', padding: '12px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnPrimary = { width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const toggleTextStyle = { textAlign: 'center', marginTop: '15px' };
const linkStyle = { color: '#28a745', cursor: 'pointer', fontWeight: 'bold' };

export default Home;