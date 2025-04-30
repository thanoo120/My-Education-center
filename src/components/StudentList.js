import React, { useEffect, useState } from 'react';
import { getEnrolledStudents } from '../services/tutorService';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const result = await getEnrolledStudents();
      setStudents(result);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>👩‍🎓 Enrolled Students</h2>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
