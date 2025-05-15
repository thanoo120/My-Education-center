import React, { useEffect, useState } from 'react';
import '../pages/StudentDashboard.css';
import ClassShedule from '../components/ClassScheduleCard';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import FeeStatus from '../components/FeeStatus';
import AttendanceStatus from '../components/AttendanceTracker';
import ExamResults from '../components/PerformanceInsights';


const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [section, setSection] = useState('welcome');
  const [MyClasses, setMyClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);

  const loginEmail = 'john@example.com';

  useEffect(() => {
    // Simulate fetching profile by email
    setProfile({ name: 'John Doe', email: loginEmail, class: '10-A' });
  //   setSubjects([
  //     { subject_name: 'Mathematics' },
  //     { subject_name: 'Biology' },
  //     { subject_name: 'Physics' },
  //     { subject_name: 'Chemistry' }
  //   ]);
  }, []);

  const renderSection = () => {
    switch (section) {
      case 'subjects':
        return (
          
          <ClassShedule/>
        );
      case 'exam':
        return  (
          <ExamResults/>
        );
        case 'logout':
          return (
            <LogoutButton/>
          );
       
          case 'payment':
            return (
              <FeeStatus/>
            );
          case 'attendance':
            return (
              <AttendanceStatus/>
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
        <button onClick={() => setSection('attendance')}>My Attendence</button>
        <button onClick={() => setSection('exam')}>Exam Results</button>
        <button onClick={() => setSection('payment')}>My Payments</button>
        <button onClick={()=> setSection('logout')}>Log out</button>
      </aside>
      <main className="content">
        {renderSection()}
      </main>
    </div>
  );
};

export default StudentDashboard;
