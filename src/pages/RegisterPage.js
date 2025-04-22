import React, { useState } from 'react';
import API from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! You can now login.');
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-box">
        <h2>Register</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <p>Already registered? <a href="/">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterPage;
