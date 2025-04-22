import React from 'react';

const ParentDashboard = () => {
  const name = localStorage.getItem('name');

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome, {name}! 👨‍👩‍👧‍👦</h1>
      <p>This is the parent dashboard.</p>
    </div>
  );
};

export default ParentDashboard;
