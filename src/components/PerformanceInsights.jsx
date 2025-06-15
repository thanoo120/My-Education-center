import React, { useState, useEffect } from 'react';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchResults = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a student email.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResults = [
        { exam_name: "Advanced Mathematics", date: "2024-11-15", marks: "92/100" },
        { exam_name: "Physics Fundamentals", date: "2024-11-10", marks: "88/100" },
        { exam_name: "Computer Science", date: "2024-11-05", marks: "95/100" },
        { exam_name: "Chemistry Lab", date: "2024-10-28", marks: "85/100" },
      ];
      setResults(mockResults);
    } catch (err) {
      setError('Failed to fetch exam results. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (marks) => {
    const score = parseInt(marks.split('/')[0]);
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getGradeEmoji = (marks) => {
    const score = parseInt(marks.split('/')[0]);
    if (score >= 90) return '🌟';
    if (score >= 80) return '🏅';
    if (score >= 70) return '📈';
    return '📘';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-block p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white text-4xl shadow-lg mb-4 animate-pulse">🎓</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Academic Excellence Portal</h1>
        <p className="text-gray-600">Discover your academic achievements and track your progress</p>
      </div>

      <form onSubmit={fetchResults} className="max-w-2xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl shadow-md border">
          <input
            type="email"
            placeholder="Enter your student email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 py-3 px-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? 'Searching...' : 'Get Results'}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto bg-red-100 text-red-700 p-4 rounded-md shadow-md text-center mb-6">
          ❗ {error}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Exam Results</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-transform transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-700">{result.exam_name}</h3>
                  <span className={`px-3 py-1 rounded-full font-semibold ${getGradeColor(result.marks)}`}>
                    {getGradeEmoji(result.marks)} {result.marks}
                  </span>
                </div>
                <p className="text-sm text-gray-600">📅 {new Date(result.date).toLocaleDateString()}</p>
                <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: `${(parseInt(result.marks.split('/')[0]) / 100) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && email && (
        <div className="max-w-xl mx-auto text-center bg-white p-10 rounded-xl shadow-md mt-10">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
          <p className="text-gray-500">We couldn’t find any results for this email. Please check and try again.</p>
        </div>
      )}

      <footer className="mt-16 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Academic Excellence Portal — Empowering students through transparent tracking
      </footer>
    </div>
  );
};

export default ExamResults;
