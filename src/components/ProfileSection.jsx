import React, { useState, useEffect } from 'react';

const ProfileSection = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('Passionate developer.');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSave = () => {
    alert('Profile updated!');
    // Connect with backend to persist the changes
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4>User Profile</h4>
        </div>
        <div className="card-body row">
          <div className="col-md-4 text-center mb-4">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="img-thumbnail rounded-circle mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <input type="file" className="form-control" onChange={handleImageChange} />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
              />
              <label className="form-check-label" htmlFor="themeSwitch">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </label>
            </div>

            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

