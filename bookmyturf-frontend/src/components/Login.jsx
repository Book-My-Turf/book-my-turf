import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                emailAddress: email,
                password: password
            });

            if (response.status === 200) {
                alert("Login Successful! Welcome " + response.data.firstName);
                navigate('/dashboard'); // Or wherever you want after login
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // YOUR REQUIREMENT: Show message and go back to Home
                alert(error.response.data); 
                navigate('/'); 
            } else {
                alert("Invalid Credentials or Server Error");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;