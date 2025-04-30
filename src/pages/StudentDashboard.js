import React, { useState } from 'react';
import StudentProfile from '../components/StudentProfile';
import AttendanceTracker from '../components/AttendanceTracker';
import AcademicPerformance from '../components/AcademicPerformance';
import FeeStatus from '../components/FeeStatus';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', backgroundColor: '#2980b9', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '40px' }}>🎓 Student Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>🧑‍🎓 Profile</li>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('attendance')}>📅 Attendance</li>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('performance')}>📈 Academic</li>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('fees')}>💵 Fee Status</li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '30px' }}>
        {activeTab === 'profile' && <StudentProfile />}
        {activeTab === 'attendance' && <AttendanceTracker />}
        {activeTab === 'performance' && <AcademicPerformance />}
        {activeTab === 'fees' && <FeeStatus />}
      </main>
    </div>
  );
}

export default StudentDashboard;
