import React, { useEffect, useState } from 'react';
import '../pages/StudentDashboard.css';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [section, setSection] = useState('welcome');
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);

  const loginEmail = 'john@example.com';

  useEffect(() => {
    // Simulate fetching profile by email
    setProfile({ name: 'John Doe', email: loginEmail, class: '10-A' });
    setSubjects([
      { subject_name: 'Mathematics' },
      { subject_name: 'Biology' },
      { subject_name: 'Physics' },
      { subject_name: 'Chemistry' }
    ]);
  }, []);

  const renderSection = () => {
    switch (section) {
      case 'subjects':
        return (
          <div className="subject-grid fade-in">
            {subjects.map((subject, index) => (
              <div key={index} className="subject-card">
                <img
                  src={`/images/${subject.subject_name.toLowerCase()}.png`}
                  alt={subject.subject_name}
                />
                <h3>{subject.subject_name}</h3>
              </div>
            ))}
          </div>
        );
      case 'profile':
        return profile && (
          <div className="card fade-in">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Class:</strong> {profile.class}</p>
          </div>
        );
      default:
        return (
          <div className="welcome-card fade-in">
            <h2>Welcome, {profile?.name || 'Student'}!</h2>
            <p>Select a section from the menu to view details.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">Faithul Hikma</div>
        <button onClick={() => setSection('welcome')}>Home</button>
        <button onClick={() => setSection('subjects')}>My Classes</button>
        <button>My Attendence</button>
        <button>Exam Results</button>
        <button onClick={() => setSection('profile')}>My Payments</button>
        <button>Log out</button>
      </aside>
      <main className="content">
        {renderSection()}
      </main>
    </div>
  );
};

export default StudentDashboard;
