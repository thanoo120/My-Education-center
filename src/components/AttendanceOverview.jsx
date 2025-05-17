import React, { useState } from 'react';
import axios from 'axios';

const AttendanceOverview = () => {
  const [email, setEmail] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !fromDate || !toDate) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/attendance/student', {
        params: {
          email,
          from: fromDate,
          to: toDate,
        },
      });
      setRecords(response.data.attendance);
    } catch (err) {
      console.log(email, fromDate, toDate);
      console.error(err);
      setError('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-primary">📆 Attendance Overview</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Attendance
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading */}
      {loading && <p className="text-center">Loading attendance...</p>}

      {/* Attendance Table */}
      {!loading && records.length > 0 && (
        <table className="table table-bordered table-hover w-full">
          <thead className="table-info">
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
                <td>{rec.status}</td>
                <td>{rec.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Records */}
      {!loading && records.length === 0 && !error && (
        <p className="text-center text-gray-500">No records found.</p>
      )}
    </div>
  );
};

export default AttendanceOverview;
