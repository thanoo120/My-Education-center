import React, { useEffect, useState } from 'react';
import { getPerformanceInsights } from '../services/parentService';

function PerformanceInsights() {
  const [insights, setInsights] = useState({});

  useEffect(() => {
    async function fetchInsights() {
      const data = await getPerformanceInsights();
      setInsights(data);
    }
    fetchInsights();
  }, []);

  return (
    <div>
      <h2>🧠 Performance Insights</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Strengths:</strong> {insights.strengths?.join(', ')}</p>
        <p><strong>Areas for Improvement:</strong> {insights.weaknesses?.join(', ')}</p>
      </div>
    </div>
  );
}

export default PerformanceInsights;
