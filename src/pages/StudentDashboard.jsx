import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaBook,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';

import ClassSchedule from '../components/ClassScheduleCard';
import AttendanceStatus from '../components/AttendanceTracker';
import FeeStatus from '../components/FeeStatus';
import ExamResults from '../components/PerformanceInsights';
import LogoutButton from '../components/LogoutButton';

const StudentDashboard = () => {
  const [section, setSection] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const loginEmail = 'john@example.com'; 

  useEffect(() => {
    fetch('/api/students/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail }),
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Profile fetch error:', err));
  }, []);

  const renderSection = () => {
    switch (section) {
      case 'classes':
        return <ClassSchedule />;
      case 'attendance':
        return <AttendanceStatus />;
      case 'payments':
        return <FeeStatus />;
      case 'results':
        return <ExamResults />;
      case 'logout':
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
            <h2 className="mb-3 text-primary">
              Welcome, {profile?.name } 👋
            </h2>
            <p className="lead">
              Use the sidebar to access your class info, attendance, fee status, and results.
            </p>
          </div>
        );
    }
  };

  const navButtons = [
    { label: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { label: 'My Classes', icon: <FaBook />, key: 'classes' },
    { label: 'My Attendance', icon: <FaCalendarCheck />, key: 'attendance' },
    { label: 'My Payments', icon: <FaMoneyCheckAlt />, key: 'payments' },
    { label: 'Exam Results', icon: <FaChartBar />, key: 'results' },
    { label: 'Logout', icon: <FaSignOutAlt />, key: 'logout' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 shadow" style={{ width: '260px' }}>
        <div className="h3 text-center mb-4 border-bottom pb-2">🎓 Student Panel</div>
        {navButtons.map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`btn btn-outline-light d-flex align-items-center w-100 mb-2 ${
              section === key ? 'active bg-primary' : ''
            }`}
            style={{ transition: 'all 0.2s ease' }}
          >
            <span className="me-2">{icon}</span>
            {label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-fill p-4">{renderSection()}</main>
    </div>
  );
};

export default StudentDashboard;
