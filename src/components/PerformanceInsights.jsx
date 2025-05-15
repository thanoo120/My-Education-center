import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/exam-results/student1@example.com');
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching exam results:', err);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Exam Results</h2>
      <ul className="space-y-2">
        {results.map((res, index) => (
          <li key={index}>
            <strong>{res.exam_name}</strong>: {res.marks} marks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamResults;
