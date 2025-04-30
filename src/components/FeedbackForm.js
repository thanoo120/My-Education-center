import React, { useState } from 'react';
import { sendFeedback } from '../services/tutorService';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await sendFeedback(feedback);
    if (success) {
      setStatus('Feedback sent successfully! ✅');
      setFeedback('');
    } else {
      setStatus('Failed to send feedback. ❌');
    }
  };

  return (
    <div>
      <h2>💬 Send Feedback</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Send
        </button>
        {status && <p style={{ marginTop: '10px' }}>{status}</p>}
      </form>
    </div>
  );
}

export default FeedbackForm;
