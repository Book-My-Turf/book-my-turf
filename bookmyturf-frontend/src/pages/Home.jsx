import React, { useState } from 'react';

const Home = () => {
  // 'landing', 'login', or 'register'
  const [view, setView] = useState('landing'); 
  
  const [formData, setFormData] = useState({
    userTypeId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    permanentAddress: '',
    cityName: '',
    contactPhoneNo: ''
  });

  const [loginData, setLoginData] = useState({
    emailAddress: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registering User:", formData);
    alert("Registration Data Captured! Check Console.");
    setView('landing');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in User:", loginData);
    alert("Login Data Captured! Check Console.");
    setView('landing');
  };

  // Styles
  const btnStyle = { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', margin: '10px' };
  const loginBtnStyle = { ...btnStyle, backgroundColor: '#007bff' };
  const inputStyle = { display: 'block', width: '300px', margin: '10px auto', padding: '8px' };
  const containerStyle = { border: '1px solid #ccc', padding: '20px', display: 'inline-block', borderRadius: '10px', marginTop: '20px' };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>BookMyTurf</h1>
      
      {view === 'landing' && (
        <div>
          <p>Book your favorite sports turf in seconds.</p>
          <button onClick={() => setView('login')} style={loginBtnStyle}>Login</button>
          <button onClick={() => setView('register')} style={btnStyle}>Register Now</button>
        </div>
      )}

      {view === 'login' && (
        <div style={containerStyle}>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <input type="email" name="emailAddress" placeholder="Email Address" onChange={handleLoginChange} required style={inputStyle} />
            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required style={inputStyle} />
            <button type="submit" style={loginBtnStyle}>Login</button>
            <button type="button" onClick={() => setView('landing')} style={{ ...btnStyle, backgroundColor: '#6c757d' }}>Back</button>
          </form>
        </div>
      )}

      {view === 'register' && (
        <div style={containerStyle}>
          <h2>User Registration</h2>
          <form onSubmit={handleRegisterSubmit}>
            <select name="userTypeId" onChange={handleChange} required style={inputStyle}>
              <option value="">Select User Type</option>
              <option value="1">Admin</option>
              <option value="2">Turf Owner</option>
              <option value="3">Player</option>
            </select>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={inputStyle} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={inputStyle} />
            <input type="email" name="emailAddress" placeholder="Email Address" onChange={handleChange} required style={inputStyle} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
            <input type="text" name="permanentAddress" placeholder="Permanent Address" onChange={handleChange} required style={inputStyle} />
            <input type="text" name="cityName" placeholder="City Name" onChange={handleChange} required style={inputStyle} />
            <input type="text" name="contactPhoneNo" placeholder="Contact Phone No" onChange={handleChange} required style={inputStyle} />
            
            <button type="submit" style={btnStyle}>Submit Registration</button>
            <button type="button" onClick={() => setView('landing')} style={{ ...btnStyle, backgroundColor: '#6c757d' }}>Back</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;