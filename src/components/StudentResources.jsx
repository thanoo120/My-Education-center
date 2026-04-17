import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResources = () => {
  const [materials, setMaterials] = useState([]);
  const [entrances, setEntrances] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [matRes, entRes] = await Promise.all([
          axios.get('http://localhost:5000/api/content/study-materials'),
          axios.get('http://localhost:5000/api/content/entrance-details')
        ]);
        setMaterials(matRes.data);
        setEntrances(entRes.data);
      } catch (err) {
        setError('Failed to load resources.');
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">Learning Resources</h4>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-4">
        <h5>Updated Study Materials</h5>
        <div className="list-group">
          {materials.length ? materials.map((item) => (
            <div key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <strong>{item.title}</strong>
                <span className="badge bg-primary">{item.subject_name}</span>
              </div>
              <div className="small text-muted">{item.description}</div>
              {item.material_url && (
                <a href={item.material_url} target="_blank" rel="noreferrer">
                  Open material
                </a>
              )}
            </div>
          )) : <div className="text-muted">No study materials available yet.</div>}
        </div>
      </div>

      <div>
        <h5>Annual University Entrance Details</h5>
        <div className="list-group">
          {entrances.length ? entrances.map((item) => (
            <div key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <strong>{item.title}</strong>
                <span className="badge bg-success">{item.year}</span>
              </div>
              <div className="small text-muted">{item.description}</div>
              <div className="small">
                Application Deadline: {item.application_deadline ? String(item.application_deadline).slice(0, 10) : '-'} | Exam Date: {item.exam_date ? String(item.exam_date).slice(0, 10) : '-'}
              </div>
              {item.link_url && (
                <a href={item.link_url} target="_blank" rel="noreferrer">
                  View details
                </a>
              )}
            </div>
          )) : <div className="text-muted">No entrance details available yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default StudentResources;
