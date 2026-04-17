import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [formData, setFormData] = useState({
    tutor_code: '',
    tutor_name: '',
    email: '',
    subject_name: ''
  });
  const [editingTutorId, setEditingTutorId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTutors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tutors/admin');
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      setMessage('Failed to load tutors.');
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      tutor_code: '',
      tutor_name: '',
      email: '',
      subject_name: ''
    });
    setEditingTutorId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (editingTutorId) {
        const payload = {
          tutor_code: formData.tutor_code,
          tutor_name: formData.tutor_name,
          email: formData.email,
          subject_name: formData.subject_name
        };

        await axios.put(`http://localhost:5000/api/tutors/admin/${editingTutorId}`, payload);
        setMessage('Tutor updated successfully.');
      } else {
        await axios.post('http://localhost:5000/api/tutors/admin', formData);
        setMessage('Tutor added successfully.');
      }

      resetForm();
      fetchTutors();
    } catch (error) {
      console.error('Error saving tutor:', error);
      setMessage(error.response?.data?.message || 'Failed to save tutor.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tutor) => {
    setEditingTutorId(tutor.tutor_id);
    setFormData({
      tutor_code: tutor.tutor_code || '',
      tutor_name: tutor.tutor_name,
      email: tutor.email,
      subject_name: tutor.subjects || ''
    });
    setShowForm(true);
    setMessage('');
  };

  const openAddForm = () => {
    setEditingTutorId(null);
    setFormData({
      tutor_code: '',
      tutor_name: '',
      email: '',
      subject_name: ''
    });
    setShowForm(true);
    setMessage('');
  };

  const handleDelete = async (tutorId) => {
    const confirmed = window.confirm('Are you sure you want to delete this tutor?');
    if (!confirmed) return;

    setLoading(true);
    setMessage('');
    try {
      await axios.delete(`http://localhost:5000/api/tutors/admin/${tutorId}`);
      setMessage('Tutor deleted successfully.');
      if (editingTutorId === tutorId) {
        resetForm();
      }
      fetchTutors();
    } catch (error) {
      console.error('Error deleting tutor:', error);
      setMessage(error.response?.data?.message || 'Failed to delete tutor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">Manage Tutors</h4>
      {!showForm && (
        <button type="button" className="btn btn-primary mb-4" onClick={openAddForm} disabled={loading}>
          Add Tutor
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="row g-3 mb-4">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="tutor_code"
              placeholder="Tutor ID"
              value={formData.tutor_code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="tutor_name"
              placeholder="Tutor Name"
              value={formData.tutor_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="subject_name"
              placeholder="Subject"
              value={formData.subject_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {editingTutorId ? 'Update Tutor' : 'Save Tutor'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {message && <div className="alert alert-info py-2">{message}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Tutor ID</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutors.length > 0 ? (
            tutors.map((tutor) => (
              <tr key={tutor.tutor_id}>
                <td>{tutor.tutor_id}</td>
                <td>{tutor.tutor_name}</td>
                <td>{tutor.email}</td>
                <td>{tutor.tutor_code}</td>
                <td>{tutor.subjects || '-'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(tutor)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(tutor.tutor_id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No tutors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TutorList;
