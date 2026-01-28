import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('bookNow');
  const [searchCity, setSearchCity] = useState('');
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) setUser(activeUser);
  }, []);

  // API Call: Find Turfs
  const fetchTurfs = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/turfs/search?city=${searchCity}`);
      setTurfs(res.data);
      setSelectedTurf(null);
    } catch (err) {
      console.error(err);
      alert("Backend connection failed. Is Spring Boot running?");
    }
  };

  // API Call: Get Slots (Green/Red Logic)
  const fetchSlots = async (turf) => {
    setSelectedTurf(turf);
    const date = new Date().toISOString().split('T')[0]; // Current Date
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/slots-availability?turfId=${turf.turfID}&date=${date}`);
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Logic for clicking a Slot
  const handleBooking = async (slot) => {
    if (slot.status === 'Booked') {
      alert("Sorry, this slot is already taken!");
      return;
    }

    const confirm = window.confirm(`Book slot for ${slot.StartTime.substring(0, 5)}?`);
    if (confirm) {
      try {
        const bookingData = {
          playerID: user.userID,
          slotID: slot.SlotID,
          bookingDate: new Date().toISOString().split('T')[0],
          totalAmount: slot.Price,
          bookingStatus: 'Confirmed',
          paymentStatus: 'Pending'
        };
        await axios.post("http://localhost:8080/api/bookings/confirm", bookingData);
        alert("Booking Confirmed!");
        fetchSlots(selectedTurf); // Refresh to turn slot RED
      } catch (err) {
        alert("Booking failed. Ensure backend has /api/bookings/confirm endpoint.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial' }}>
      {/* SIDEBAR */}
      <div style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2>Player Panel</h2>
        <button style={activeTab === 'bookNow' ? activeBtn : menuBtn} onClick={() => setActiveTab('bookNow')}>⚽ Book Now</button>
        <button style={activeTab === 'history' ? activeBtn : menuBtn} onClick={() => setActiveTab('history')}>📅 Booking History</button>
        <button style={activeTab === 'payments' ? activeBtn : menuBtn} onClick={() => setActiveTab('payments')}>💳 Payment History</button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f4f7f6' }}>
        <h1>Welcome, {user?.firstName}</h1>

        {activeTab === 'bookNow' && (
          <div>
            <h3>Search for Turfs</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input style={inputStyle} placeholder="City Name" onChange={(e) => setSearchCity(e.target.value)} />
              <button style={searchBtn} onClick={fetchTurfs}>Search</button>
            </div>

            {/* List of Turfs */}
            {!selectedTurf ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {turfs.map(t => (
                  <div key={t.turfID} style={cardStyle} onClick={() => fetchSlots(t)}>
                    <h4>{t.turfName}</h4>
                    <p>{t.city}</p>
                    <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px' }}>Check Slots</button>
                  </div>
                ))}
              </div>
            ) : (
              /* Green/Red Slot Area */
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <button onClick={() => setSelectedTurf(null)}>← Back</button>
                <h3>Slots for {selectedTurf.turfName}</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {slots.map(s => (
                    <button 
                      key={s.SlotID} 
                      onClick={() => handleBooking(s)} 
                      style={{
                        padding: '20px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: s.status === 'Booked' ? 'not-allowed' : 'pointer',
                        backgroundColor: s.status === 'Booked' ? '#e74c3c' : '#2ecc71',
                        minWidth: '100px'
                      }}>
                      {s.StartTime.substring(0, 5)} <br />
                      <span style={{ fontSize: '12px' }}>{s.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Styles
const menuBtn = { width: '100%', padding: '12px', marginBottom: '10px', cursor: 'pointer', background: 'none', color: 'white', border: 'none', textAlign: 'left' };
const activeBtn = { ...menuBtn, backgroundColor: '#28a745' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const searchBtn = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const cardStyle = { backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' };

export default PlayerDashboard;