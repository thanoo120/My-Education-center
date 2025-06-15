import React, { useState, useEffect, useRef } from 'react';

const StudentProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    const bg =
      savedTheme === 'dark'
        ? 'linear-gradient(to bottom right, #212529, #343a40)'
        : 'linear-gradient(to bottom right, #f0f2f5, #e0e4eb)';
    document.body.style.background = bg;
    document.body.style.transition = 'background 0.3s ease-in-out';
    document.body.style.minHeight = '100vh';
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('studentEmail') || 'holibai17@gmail.com';
    const savedName = localStorage.getItem('userName');
    const savedImage = localStorage.getItem('userProfileImage');

    setEmail(storedEmail);
    if (savedName) setName(savedName);
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    document.body.style.background =
      newTheme === 'dark'
        ? 'linear-gradient(to bottom right, #212529, #343a40)'
        : 'linear-gradient(to bottom right, #f0f2f5, #e0e4eb)';
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    const updatedData = {
      name,
      profile_image_url: profileImage,
    };

    try {
      const response = await fetch(`/api/students/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userName', name);
        localStorage.setItem('userProfileImage', profileImage || '');
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '550px', width: '100%' }}>
        <div
          className="card-header bg-gradient text-white text-center py-4 rounded-top-4 position-relative"
          style={{ background: 'linear-gradient(135deg, #4e73df, #224abe)' }}
        >
          <h4 className="mb-0 fs-3">User Profile</h4>
          <button
            onClick={handleThemeToggle}
            className="btn btn-outline-light rounded-pill position-absolute top-50 end-0 translate-middle-y me-3"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>}
          </button>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <img
              src={profileImage || 'https://via.placeholder.com/200/f8f9fa/dee2e6?text=Upload'}
              alt="Profile"
              className="img-thumbnail rounded-circle mb-3 border-0 shadow-sm"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm rounded-pill px-4 mt-2"
              onClick={triggerFileInput}
            >
              <i className="bi bi-camera-fill me-2"></i>Change Photo
            </button>

            <h5 className="mt-3 mb-0">{name}</h5>
            <p className="text-muted">{email}</p>
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                <i className="bi bi-person-fill me-2 text-primary"></i>Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-light text-muted"
                id="email"
                value={email}
                readOnly
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-save-fill me-2"></i>Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
