import React, { useState, useEffect } from 'react';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // reserved for future enhancements
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
    <div
      className="p-4 p-md-5 rounded-4"
      style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 45%, #e0f2fe 100%)',
        minHeight: '85vh'
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg mb-3"
            style={{
              width: '92px',
              height: '92px',
              fontSize: '2.2rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)'
            }}
          >
            🎓
          </div>
          <h1 className="fw-bold mb-2" style={{ color: '#1f2937' }}>Academic Excellence Portal</h1>
          <p className="text-secondary mb-0">Discover your academic achievements and track your progress</p>
        </div>

        <div className="card border-0 shadow-lg rounded-4 mb-4 overflow-hidden">
          <div
            className="px-4 py-3 text-white fw-semibold"
            style={{ background: 'linear-gradient(90deg, #4338ca, #7c3aed)' }}
          >
            Search Results by Student Email
          </div>
          <div className="card-body p-4">
            <form onSubmit={fetchResults}>
              <div className="row g-3 align-items-center">
                <div className="col-md-9">
                  <input
                    type="email"
                    placeholder="Enter your student email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                    disabled={loading}
                  />
                </div>
                <div className="col-md-3 d-grid">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg text-white fw-semibold"
                    style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }}
                  >
                    {loading ? 'Searching...' : 'Get Results'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {error && (
        <div className="container">
          <div className="alert alert-danger text-center shadow-sm rounded-3 mb-4">
          ❗ {error}
          </div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" style={{ color: '#1f2937' }}>Your Exam Results</h2>
          <div className="row g-4">
            {results.map((result, index) => (
              <div key={index} className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="h5 fw-bold mb-0 text-dark">{result.exam_name}</h3>
                      <span className={`badge rounded-pill px-3 py-2 ${getGradeColor(result.marks)}`}>
                        {getGradeEmoji(result.marks)} {result.marks}
                      </span>
                    </div>
                    <p className="text-secondary mb-3">📅 {new Date(result.date).toLocaleDateString()}</p>
                    <div className="progress" style={{ height: '10px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(parseInt(result.marks.split('/')[0]) / 100) * 100}%`,
                          background: 'linear-gradient(90deg, #4f46e5, #7c3aed)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && email && (
        <div className="container">
          <div className="card border-0 shadow-sm rounded-4 mx-auto text-center p-4 p-md-5" style={{ maxWidth: '720px' }}>
            <div style={{ fontSize: '2.2rem' }} className="mb-2">🔍</div>
            <h3 className="h5 fw-bold mb-2 text-dark">No Results Found</h3>
            <p className="text-secondary mb-0">We could not find any results for this email. Please check and try again.</p>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default ExamResults;
