import React, { useEffect, useState } from 'react';
import { getStudentProgress } from '../services/parentService';

function StudentProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    async function fetchProgress() {
      const data = await getStudentProgress();
      setProgress(data);
    }
    fetchProgress();
  }, []);

  return (
    <div>
      <h2>📚 Student Progress Report</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Name:</strong> {progress.name}</p>
        <p><strong>Class:</strong> {progress.classroom}</p>
        <p><strong>Attendance:</strong> {progress.attendance}%</p>
      </div>

      <h3 style={{ marginTop: '30px' }}>Academic Results</h3>
      <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {progress.results?.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.subject}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentProgress;
