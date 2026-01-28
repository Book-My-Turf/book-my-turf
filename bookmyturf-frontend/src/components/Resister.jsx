import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        contactPhoneNo: '',
        userType: { userTypeID: 3 } // Defaulting to 'Player' as per your SQL seed
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/users/register", formData);
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (error) {
            alert("Registration failed. Email might already exist.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="First Name" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, emailAddress: e.target.value})} />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <input type="text" placeholder="Phone" onChange={(e) => setFormData({...formData, contactPhoneNo: e.target.value})} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;