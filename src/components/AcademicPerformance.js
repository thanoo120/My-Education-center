import React, { useEffect, useState } from 'react';
import { getAcademicPerformance } from '../services/studentService';

function AcademicPerformance() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    async function fetchPerformance() {
      const data = await getAcademicPerformance();
      setPerformance(data);
    }
    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>📈 Academic Performance</h2>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((item, index) => (
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

export default AcademicPerformance;
