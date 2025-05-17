import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/exams/exams')
      .then(res => setExams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">📝 Exam Management</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-danger">
          <tr>
            <th>Exam</th>
            <th>Date</th>
            <th>Subject ID</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{exam.date}</td>
              <td>{exam.subject_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManagement;
