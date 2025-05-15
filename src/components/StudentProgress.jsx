import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/students/stustudent-progress');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student progress:', error);
      }
    };

    fetchProgress();
  }, []);

  // Helper to get badge class based on status
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Improving':
        return 'bg-success';
      case 'Needs Attention':
        return 'bg-warning';
      case 'Falling Behind':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        Student Progress Overview
      </div>
      <div className="card-body">
        <ul className="list-group">
          {students.map((student, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{student.name}</span>
              <span className={`badge ${getBadgeClass(student.status)}`}>{student.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentProgress;
