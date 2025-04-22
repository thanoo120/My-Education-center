import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import ParentDashboard from './pages/ParentDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/tutor-dashboard" element={<TutorDashboard />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
    </Routes>
  );
}

export default App;
