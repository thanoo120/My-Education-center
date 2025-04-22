import React from 'react';

const TutorDashboard = () => {
  const name = localStorage.getItem('name');

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome, {name}! 👩‍🏫</h1>
      <p>This is the tutor dashboard.</p>
    </div>
  );
};

export default TutorDashboard;
