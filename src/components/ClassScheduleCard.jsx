import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassSchedule = ({ email }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`api/students/timetable?email=${email}`);
        setSchedule(res.data.subjects);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [email]);

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">My Class Schedule</h2>
      <ul className="space-y-2">
        {schedule.map((cls, index) => (
          <li key={index} className="border-b pb-2">
            <strong>{cls.subject_name}</strong> - {cls.time} <br />
            <span className="text-sm text-gray-600">Tutor: {cls.tutor_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassSchedule;
