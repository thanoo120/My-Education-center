import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: '40px',
        padding: '10px 20px',
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
