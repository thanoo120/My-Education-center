import React, { useState } from 'react';
import ClassScheduleCard from '../components/ClassScheduleCard';
import StudentList from '../components/StudentList';
import FeedbackForm from '../components/FeedbackForm';

function TutorDashboard() {
  const [activeTab, setActiveTab] = useState('schedule');

  return (
    <div className="tutor-dashboard">
      <aside className="sidebar">
        <h2>👨‍🏫 Tutor Panel</h2>
        <ul>
          <li onClick={() => setActiveTab('schedule')}>📅 Class Schedules</li>
          <li onClick={() => setActiveTab('students')}>👩‍🎓 Students</li>
          <li onClick={() => setActiveTab('feedback')}>💬 Send Feedback</li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === 'schedule' && <ClassScheduleCard />}
        {activeTab === 'students' && <StudentList />}
        {activeTab === 'feedback' && <FeedbackForm />}
      </main>
    </div>
  );
}

export default TutorDashboard;
