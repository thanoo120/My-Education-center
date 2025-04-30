import React, { useEffect, useState } from 'react';
import { getAssignedClasses } from '../services/tutorService';

function ClassScheduleCard() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      const result = await getAssignedClasses();
      setClasses(result);
    }
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>📅 Assigned Class Schedules</h2>
      <div style={{ marginTop: '20px' }}>
        {classes.map((cls, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            <h3>{cls.subject}</h3>
            <p>🕒 {cls.time}</p>
            <p>🏫 {cls.classroom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassScheduleCard;
