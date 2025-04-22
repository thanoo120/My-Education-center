import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
  
        if (data.role === 'student') {
          navigate('/student-dashboard');
        } else if (data.role === 'tutor') {
          navigate('/tutor-dashboard');
        } else if (data.role === 'parent') {
          navigate('/parent-dashboard');
        }
      } else {
        console.log("Full response: ", data);
        alert('Login failed: ' + (data.message || 'Invalid credentials or server error'));
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: Something went wrong. Please try again.');
    }
  };
  

  return (
     
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
