import React, { useState } from 'react';
import {
  FaUsers, FaUserTie, FaMoneyCheckAlt, FaCalendarCheck,
  FaFileAlt, FaSignOutAlt, FaHome
} from 'react-icons/fa';
import 'animate.css';

import StudentList from '../components/StudentList';
import TutorList from '../components/TutorList';
import PaymentRecords from '../components/PaymentRecords';
import AttendanceOverview from '../components/AttendanceOverview';
import ExamManagement from '../components/ExamManagement';
import LogoutButton from '../components/LogoutButton';
import SummaryCard from '../components/SummaryCard'
const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'students': return <StudentList />;
      case 'tutors': return <TutorList />;
      case 'payments': return <PaymentRecords />;
      case 'attendance': return <AttendanceOverview />;
      case 'exams': return <ExamManagement />;
      case 'logout': return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-5 rounded shadow animate__animated animate__fadeIn">
            <h2 className="mb-3 text-primary fw-bold">Welcome, Admin 👋</h2>
            <p className="lead text-muted">Use the menu on the left to manage the platform efficiently.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin" style={{ width: '150px' }} />
            <SummaryCard/>
          </div>
        );
    }
  };

  const navButtons = [
    { label: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { label: 'Manage Students', icon: <FaUsers />, key: 'students' },
    { label: 'Manage Tutors', icon: <FaUserTie />, key: 'tutors' },
    { label: 'Payments', icon: <FaMoneyCheckAlt />, key: 'payments' },
    { label: 'Attendance', icon: <FaCalendarCheck />, key: 'attendance' },
    { label: 'Exams', icon: <FaFileAlt />, key: 'exams' },
    { label: 'Logout', icon: <FaSignOutAlt />, key: 'logout' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 shadow-lg" style={{ width: '250px' }}>
        <div className="h3 text-center mb-4 border-bottom pb-3 fw-bold">
          🎓 Admin Panel
        </div>
        {navButtons.map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`btn d-flex align-items-center w-100 mb-3 px-3 py-2 rounded-3 text-start ${
              section === key ? 'btn-primary text-white' : 'btn-outline-light'
            }`}
            style={{ transition: '0.3s ease-in-out' }}
          >
            <span className="me-3 fs-5">{icon}</span>
            <span className="fw-semibold">{label}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-fill p-4 bg-light">
        <div className="container animate__animated animate__fadeIn">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
