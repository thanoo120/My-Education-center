import React, { useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.get('http://localhost:5000/api/exams/results', {
        params: { email },
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch exam results. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Modernized Banner */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden rounded-t-xl">
          <img
            src="https://images.unsplash.com/photo-1584697964154-e43b1cd5f4c0?auto=format&fit=crop&w=1470&q=80"
            alt="Abstract educational background"
            className="w-full h-full object-cover object-center opacity-30" // Subtle overlay
          />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg leading-tight">
              🎓 Your Academic Journey, Unveiled
            </h1>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Student Exam Results 🚀
          </h2>

          <form onSubmit={fetchResults} className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-2/3">
              <input
                type="email"
                placeholder="Enter Student Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition duration-300 text-gray-800 placeholder-gray-400"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Fetching...
                </div>
              ) : (
                'Get Marks'
              )}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center text-lg font-medium mb-6 animate-pulse">
              🚨 {error}
            </p>
          )}

          {!loading && !error && results.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Your Detailed Performance</h3>
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-left">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-4 border-b-2 border-blue-700 rounded-tl-lg text-lg font-semibold">
                        📚 Exam Name
                      </th>
                      <th className="p-4 border-b-2 border-blue-700 text-lg font-semibold">
                        📅 Date
                      </th>
                      <th className="p-4 border-b-2 border-blue-700 rounded-tr-lg text-lg font-semibold">
                        📝 Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((res, index) => (
                      <tr
                        key={index}
                        className={`transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                        } hover:bg-blue-100 border-b border-gray-200`}
                      >
                        <td className="p-4 text-gray-800">{res.exam_name}</td>
                        <td className="p-4 text-gray-700">
                          {new Date(res.date).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{res.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {!loading && !error && results.length === 0 && email && (
            <p className="text-center text-gray-500 text-lg py-8">
              😔 No exam results found for this email.
            </p>
          )}

          {!loading && !error && results.length === 0 && !email && (
            <p className="text-center text-gray-500 text-lg py-8">
              Enter an email to find results.
            </p>
          )}

          {/* How it Works Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-3">✉️</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">1. Enter Your Email</h4>
                <p className="text-gray-600">
                  Simply type in your registered student email address.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">2. Get Your Marks</h4>
                <p className="text-gray-600">
                  Click 'Get Marks' to instantly retrieve your exam scores.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">3. View Results</h4>
                <p className="text-gray-600">
                  See a comprehensive list of all your exam performances.
                </p>
              </div>
            </div>
          </div>

          {/* Key Highlights Section (Example Static Content) */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              Key Academic Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-red-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-red-600">A+</span>
                <p className="text-gray-700 text-sm mt-1">Highest Grade</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-blue-600">85%</span>
                <p className="text-gray-700 text-sm mt-1">Average Score</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-green-600">12</span>
                <p className="text-gray-700 text-sm mt-1">Exams Taken</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-purple-600">3</span>
                <p className="text-gray-700 text-sm mt-1">Upcoming Exams</p>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              *These highlights are examples and will reflect your actual data upon implementation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 text-center text-sm rounded-b-2xl">
          <p>&copy; {new Date().getFullYear()} Student Results Portal. All rights reserved.</p>
          <p className="mt-1">Powered by Your Education Partner.</p>
        </footer>
      </div>
    </div>
  );
};

export default ExamResults;