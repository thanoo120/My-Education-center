import React, { useState } from 'react';
import API from '../services/api'; // Assuming your API service is correctly configured

const RegisterPage = () => {
  // Initialize form state including confirmPassword
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    student_id: '' // optional: link parent to a student (used when role is parent)
  });
  const [error, setError] = useState(''); // State to display validation or API errors

  // Handles input changes and updates the form state
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Client-side validation: password match and strength
  const passwordMismatch = form.password && form.confirmPassword && form.password !== form.confirmPassword;
  const passwordTooShort = form.password && form.password.length > 0 && form.password.length < 6;

  // Handles the registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordMismatch) {
      setError('Passwords do not match. Please ensure both fields are identical.');
      return;
    }
    if (passwordTooShort) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const payload = { ...form };
      if (payload.student_id === '') delete payload.student_id;
      const res = await API.post('/auth/register', payload);
      const roleId = res.data?.roleId;
      const idMessage = roleId ? ` Your ID: ${roleId}` : '';
      alert(`Registration successful!${idMessage} You can now login.`);
      window.location.href = '/'; // Redirect to home/login page
    } catch (err) {
      // Display specific error from the backend or a general message
      setError('Registration failed: ' + (err.response?.data?.message || err.response?.data?.error || err.message));
    }
  };

  return (
    // Outer container for the full page, centered vertically and horizontally
    // bg-light-subtle provides a very subtle light background
    // p-4 adds padding on all sides, min-vh-100 ensures it takes full viewport height
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-body-tertiary p-4">
      <form
        onSubmit={handleRegister}
        // bg-white for form background, p-5 for ample padding
        // rounded-4 for significantly rounded corners, shadow-lg for a strong shadow
        // w-100 ensures it takes full width on small screens, max-width on larger screens
        // max-w-sm custom class can be added if you define it in global CSS
        // For pure Bootstrap, we use responsive width classes like w-100 w-md-75 w-lg-50
        // Here, we'll just set a base width and let Bootstrap handle responsiveness
        className="bg-white p-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '500px' }}
      >
        <h2 className="text-center mb-5 text-primary fw-bold display-6">Create Your Account</h2>

        {/* Display error message if 'error' state is not empty */}
        {error && (
          <div className="alert alert-danger fade show mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="mb-4"> {/* Increased margin-bottom for better spacing */}
          <label htmlFor="nameInput" className="form-label visually-hidden">Full Name</label>
          <input
            name="name"
            id="nameInput"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="form-control form-control-lg" // Larger input field
          />
        </div>

        <div className="mb-4">
          <label htmlFor="emailInput" className="form-label visually-hidden">Email Address</label>
          <input
            name="email"
            id="emailInput"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="form-control form-control-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="passwordInput" className="form-label visually-hidden">Password</label>
          <input
            name="password"
            id="passwordInput"
            type="password"
            placeholder="Password (min 6 characters)"
            onChange={handleChange}
            required
            minLength={6}
            className={`form-control form-control-lg ${passwordTooShort ? 'is-invalid' : ''}`}
          />
          {passwordTooShort && (
            <div className="invalid-feedback">Password must be at least 6 characters.</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPasswordInput" className="form-label visually-hidden">Confirm Password</label>
          <input
            name="confirmPassword"
            id="confirmPasswordInput"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className={`form-control form-control-lg ${passwordMismatch ? 'is-invalid' : ''}`}
          />
          {passwordMismatch && (
            <div className="invalid-feedback">Passwords do not match.</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="roleSelect" className="form-label visually-hidden">Your Role</label>
          <select
            name="role"
            id="roleSelect"
            onChange={handleChange}
            required
            className="form-select form-select-lg"
            defaultValue="student"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        {form.role === 'parent' && (
          <div className="mb-5">
            <label htmlFor="studentIdInput" className="form-label">Student ID (optional)</label>
            <input
              name="student_id"
              id="studentIdInput"
              type="number"
              min="1"
              placeholder="Link to your student's ID"
              onChange={handleChange}
              value={form.student_id}
              className="form-control form-control-lg"
            />
          </div>
        )}
        {form.role !== 'parent' && <div className="mb-5" />}

        <button
          type="submit"
          className="btn btn-primary w-100 py-3 mb-4 fw-bold fs-5" // Larger button, bolder text, increased padding, larger font size
        >
          Register
        </button>

        <p className="text-center mt-3 mb-0 text-muted fs-6">
          Already have an account?{' '}
          <a href="/" className="text-primary fw-bold text-decoration-underline-hover"> {/* Underline on hover effect */}
            Log In Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;