import React, { useEffect, useState } from 'react';
import StudentProgressReport from '../components/StudentProgress';
import AttendanceStatus from '../components/AttendanceTracker';
import ExamResults from '../components/PerformanceInsights';
import FeedbackCenter from '../components/FeedbackCenter';
import LogoutButton from '../components/LogoutButton';

const ParentDashboard = () => {
  const [section, setSection] = useState('home');
  const [studentProfile, setStudentProfile] = useState(null);
  const parentEmail = localStorage.getItem('studentEmail');

  useEffect(() => {
    if (!parentEmail) return;
    fetch('/api/parent/student-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: parentEmail }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setStudentProfile(data))
      .catch((err) => console.error('Error:', err));
  }, [parentEmail]);

  const renderSection = () => {
    switch (section) {
      case 'progress':
        return <StudentProgressReport />;
      case 'attendance':
        return <AttendanceStatus />;
      case 'exam':
        return <ExamResults />;
      case 'feedback':
        return <FeedbackCenter />;
      case 'logout':
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-4 rounded shadow-md animate-fade-in">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
              <div>
                <h2 className="h4 mb-1 text-primary">Parent Insight Center</h2>
                <p className="text-muted mb-0">
                  Stay connected with your child's learning journey in one place.
                </p>
              </div>
              <span className="badge bg-primary-subtle text-primary mt-2 mt-md-0">
                Active Session
              </span>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <div className="border rounded p-3 h-100 bg-light">
                  <div className="small text-secondary">Student</div>
                  <div className="fw-semibold">{studentProfile?.student_name || 'Not linked yet'}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-3 h-100 bg-light">
                  <div className="small text-secondary">Student Email</div>
                  <div className="fw-semibold">{studentProfile?.student_email || '-'}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-3 h-100 bg-light">
                  <div className="small text-secondary">Linked Parent Email</div>
                  <div className="fw-semibold">{parentEmail || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-secondary text-white p-4" style={{ width: '250px' }}>
        <div className="h4 text-center mb-4">📘 Parent Portal</div>

        <button
          onClick={() => setSection('home')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Home
        </button>

        <button
          onClick={() => setSection('progress')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Progress Report
        </button>

        <button
          onClick={() => setSection('attendance')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Attendance Overview
        </button>

        <button
          onClick={() => setSection('exam')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Exam Results
        </button>

        <button
          onClick={() => setSection('feedback')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Tutor Feedback
        </button>

        <button
          onClick={() => setSection('logout')}
          className="btn btn-outline-light d-block w-100"
        >
          Log out
        </button>
      </aside>

      
      <main className="flex-fill p-4">{renderSection()}</main>
    </div>
  );
};

export default ParentDashboard;
