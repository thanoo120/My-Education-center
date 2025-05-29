import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubjectCart = () => {
  const [subjects, setSubjects] = useState([]);
  const [tutorInfo, setTutorInfo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/subjects/allsubjects')
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error('Error fetching subjects:', err));
  }, []);

  const handleViewTutor = (tutorId) => {
    fetch(`http://localhost:5000/api/tutors/${tutorId}`)
      .then((res) => res.json())
      .then((data) => setTutorInfo(data))
      .catch((err) => console.error('Error fetching tutor info:', err));
  };

  const handleEnroll = (subjectId) => {
    alert(`Enrolled in subject ID: ${subjectId}`);
  
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary">📚 Subject Catalog</h2>
      <div className="row">
        {subjects.map((subject) => (
          
          <div key={subject.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-info">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{subject.subject_name}</h5>
                <p className="card-text text-muted">
                  <strong>SubjectId:</strong> {subject.subject_id} <br />
                  <strong>TutorName:</strong> {subject.tutor_name || 'N/A'} <br />
                  <strong>Fees:</strong> {subject.fees|| 'No description provided.'}
                </p>
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-success w-100 mb-2"
                    onClick={() => handleEnroll(subject.id)}
                  >
                    Enroll
                  </button>
                  <button
                    className="btn btn-outline-info w-100"
                    onClick={() => handleViewTutor(subject.tutorId)}
                  >
                    View Tutor
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {tutorInfo && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-info">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">👨‍🏫 Tutor Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setTutorInfo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {tutorInfo.name}</p>
                <p><strong>Email:</strong> {tutorInfo.email}</p>
                <p><strong>Expertise:</strong> {tutorInfo.expertise || 'N/A'}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setTutorInfo(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectCart;
