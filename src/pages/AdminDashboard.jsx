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
    <div className="container-fluid py-4">
      {/* PROFILE HEADER */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin avatar"
          className="rounded-circle me-3"
          width="60"
        />
        <div>
          <h4 className="mb-0 fw-bold">Welcome back, Admin!</h4>
          <span className="text-muted small">Have a productive day 👋</span>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">
        <SummaryCard title="Students"   value={counts.students} icon="🎓" color="#0d6efd" />
        <SummaryCard title="Tutors"     value={counts.tutors}   icon="🧑‍🏫" color="#20c997" />
        <SummaryCard title="Parents"    value={counts.parents}  icon="👨‍👩‍👧‍👦" color="#fd7e14" />
        <SummaryCard title="New Msgs"   value={messages.length} icon="✉️" color="#dc3545" />
      </div>

      {/* CHARTS ROW */}
      <div className="row">
        {/* EXAM ANALYSIS */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title mb-3">Exam Performance (avg %)</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={examData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                  <XAxis dataKey="subject"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" stackId="a" fill="#0d6efd"/>
                  <Bar dataKey="highest" stackId="a" fill="#20c997"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* PAYMENT ANALYSIS */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title mb-3">Payments Last 12 Months ($)</h6>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentData}>
                  <XAxis dataKey="month"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#fd7e14" strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* MESSAGES PANEL */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="card-title mb-3">Incoming Messages</h6>

          {messages.length === 0 && (
            <p className="text-muted">No new messages 🎉</p>
          )}

          {messages.length > 0 && (
            <ul className="list-group">
              {messages.map(m => (
                <MessageItem key={m.id} item={m} onReplied={refreshMessages}/>
              ))}
            </ul>
          )}
        </div>
      </div>
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
