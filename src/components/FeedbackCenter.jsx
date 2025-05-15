import React, { useState } from 'react';

const FeedbackCenter = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      alert('Feedback sent successfully!');
      setMessage('');
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-white">
        Send Feedback / Announcement
      </div>
      <div className="card-body">
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Write a message to students or parents..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="btn btn-info" onClick={handleSend}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default FeedbackCenter;
