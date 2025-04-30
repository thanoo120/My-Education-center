import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

import './adminDashboard.css'; // Import your CSS file for styling
function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');

  const username = localStorage.getItem('username') || 'Admin';

  const renderContent = () => {
    switch (activePage) {
      case 'students':
        return <div className="content-section">Students Management (Attendance, Results, Payments)</div>;
      case 'tutors':
        return <div className="content-section">Tutor Management (Assign Tutors, Schedules, Subjects)</div>;
      case 'attendance':
        return <div className="content-section">Attendance Monitoring (Students & Tutors)</div>;
      case 'fees':
        return <div className="content-section">Fee Tracking and Receipts</div>;
      case 'reports':
        return <div className="content-section">Reports Export (PDF, Excel)</div>;
      default:
        return <div className="content-section">Welcome {username}! 📊 Please select a section.</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => setActivePage('students')}>Students</button>
        <button onClick={() => setActivePage('tutors')}>Tutors</button>
        <button onClick={() => setActivePage('attendance')}>Attendance</button>
        <button onClick={() => setActivePage('fees')}>Fees</button>
        <button onClick={() => setActivePage('reports')}>Reports</button>
        <LogoutButton className="logout-button" />
      </div>

      {/* Main content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
