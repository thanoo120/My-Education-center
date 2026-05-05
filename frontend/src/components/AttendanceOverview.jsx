import React, { useState } from 'react';
import axios from 'axios';

const AttendanceOverview = () => {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [tutorId, setTutorId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* ----------------- extra state for add-form ----------------- */
  const [addStatus, setAddStatus] = useState('Present');
  const [addRemarks, setAddRemarks] = useState('');

  /* ----------------- helpers ----------------- */
  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/attendance/student', {
      params: { student_email: email, from: fromDate, to: toDate },
    });
    setRecords(res.data.attendance);
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!email || !fromDate || !toDate) {
      setError('All fields are required to fetch attendance.');
      return;
    }
    try {
      setLoading(true); setError(''); setSuccess('');
      await fetchRecords();
    } catch {
      setError('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!studentId || !email || !tutorId || !courseId || !fromDate) {
      setError('All fields are required to add attendance.');
      return;
    }
    try {
      setLoading(true); setError(''); setSuccess('');
      await axios.post('http://localhost:5000/api/attendance/mark', {
        student_id: studentId,
        student_email: email,
        tutor_id: tutorId,
        course_id: courseId,
        date: fromDate,
        status: addStatus,
        remarks: addRemarks,
      });
      setSuccess('Attendance added successfully.');
      setAddRemarks('');
      await fetchRecords();                // refresh the table
    } catch {
      setError('Failed to add attendance record.');
    } finally {
      setLoading(false);
    }
  };

  /* ----------------- UI ----------------- */
  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary">📆 Attendance Overview</h3>
        <p className="text-muted mb-0">Manage and review student attendance records</p>
      </div>

      {/* ───────────── Fetch Attendance Card ───────────── */}
      <div className="card shadow-sm mb-4 border-start border-4 border-info">
        <div className="card-body">
          <h5 className="card-title text-info mb-3">🔍 Get Attendance</h5>
          <form onSubmit={handleFetch} className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Student Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-info">Fetch</button>
            </div>
          </form>
        </div>
      </div>

      {/* alert messages */}
      {error   && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {loading && <p className="text-center text-muted">Loading...</p>}

      {/* ───────────── Add Attendance Card ───────────── */}
      <div className="card shadow-sm mb-4 border-start border-4 border-success">
        <div className="card-body">
          <h5 className="card-title text-success mb-3">➕ Add Attendance</h5>
          <form onSubmit={handleAdd} className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Student&nbsp;ID</label>
              <input
                type="text"
                className="form-control"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Student&nbsp;Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Tutor&nbsp;ID</label>
              <input
                type="text"
                className="form-control"
                value={tutorId}
                onChange={(e) => setTutorId(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Course&nbsp;ID</label>
              <input
                type="text"
                className="form-control"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={addStatus}
                onChange={(e) => setAddStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Remarks&nbsp;(optional)</label>
              <input
                type="text"
                className="form-control"
                value={addRemarks}
                onChange={(e) => setAddRemarks(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>
      </div>

      {/* ───────────── Table Card ───────────── */}
      {records.length > 0 && !loading && (
        <div className="card shadow-sm mb-5 border-start border-4 border-warning">
          <div className="card-body">
            <h5 className="card-title text-warning mb-3">📑 Attendance Records</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Date</th>
                    <th>Student Email</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={idx}>
                      <td>{rec.date}</td>
                      <td>{rec.student_email}</td>
                      <td>
                        <span className={`badge ${rec.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                          {rec.status}
                        </span>
                      </td>
                      <td>{rec.remarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!loading && records.length === 0 && !error && (
        <p className="text-center text-muted">No records found.</p>
      )}
    </div>
  );
};

export default AttendanceOverview;
