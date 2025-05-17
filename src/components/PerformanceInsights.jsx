import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(''); // Replace with actual logged-in student's email
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student', {
          params: { email }
        });
        setResults(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch exam results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [email]);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Exam Results</h2>

      {loading && <p>Loading results...</p>}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!loading && !error && results.length === 0 && (
        <p>No results found.</p>
      )}
      <form  className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border p-2 rounded"
        />
       
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Marks
        </button>
      </form>

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
