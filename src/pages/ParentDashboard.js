import React, { useState } from 'react';
import StudentProgress from '../components/StudentProgress';
import PerformanceInsights from '../components/PerformanceInsights';

function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', backgroundColor: '#27ae60', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '40px' }}>👨‍👩‍👧 Parent Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('progress')}>📚 Student Progress</li>
          <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActiveTab('insights')}>🧠 Performance Insights</li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '30px' }}>
        {activeTab === 'progress' && <StudentProgress />}
        {activeTab === 'insights' && <PerformanceInsights />}
      </main>
    </div>
  );
}

export default ParentDashboard;
