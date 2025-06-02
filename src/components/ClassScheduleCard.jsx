import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css'; 


const ClassItem = ({ cls }) => (
  <li
    className="mb-3 p-3 border rounded bg-light shadow-sm hover-shadow"
    style={{ transition: 'all 0.2s ease-in-out' }}
  >
    <div className="fw-bold fs-5 mb-1 text-primary">{cls.subject_name}</div>
    <div className="text-dark">
      🕒 {cls.time}
    </div>
    <div className="text-muted small">
      👨‍🏫 Tutor: {cls.tutor_name}
    </div>
  </li>
);

// Reusable component for a single exam item
const ExamItem = ({ exam }) => (
  <li
    className="mb-3 p-3 border rounded bg-white shadow-sm hover-shadow"
    style={{ transition: 'all 0.2s ease-in-out', borderLeft: '5px solid #0d6efd' }}
  >
    <div className="fw-bold fs-5 mb-1 text-info">{exam.exam_name}</div>
    <div className="text-dark">
      🗓️ Date: {exam.date}
    </div>
    <div className="text-dark">
      ⏰ Time: {exam.time}
    </div>
    <div className="text-muted small">
      📚 Subject: {exam.subject_name}
    </div>
  </li>
);


const ActivityItem = ({ activity }) => (
  <li
    className="mb-3 p-3 border rounded bg-white shadow-sm hover-shadow"
    style={{ transition: 'all 0.2s ease-in-out', borderLeft: '5px solid #28a745' }}
  >
    <div className="fw-bold fs-5 mb-1 text-success">{activity.title}</div>
    <div className="text-dark">
      📍 Location: {activity.location}
    </div>
    <div className="text-dark">
      🗓️ Date: {activity.date}
    </div>
    <div className="text-dark">
      ⏰ Time: {activity.time}
    </div>
    <div className="text-muted small">
      📝 Description: {activity.description}
    </div>
  </li>
);


const ClassSchedule = ({ email }) => {
  const [schedule, setSchedule] = useState([]);
  const [futureExams, setFutureExams] = useState([]);
  const [classActivities, setClassActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        // Fetch Class Schedule
        const scheduleRes = await axios.get(`http://localhost:5000/api/students/timetable?email=${email}`);
        setSchedule(scheduleRes.data.subjects);

        
        // e.g., await axios.get(`http://localhost:5000/api/students/exams?email=${email}`);
        // e.g., await axios.get(`http://localhost:5000/api/students/activities?email=${email}`);

        const mockExams = [
          {
            exam_name: 'Mid-term Mathematics',
            date: '2025-06-20',
            time: '09:00 AM',
            subject_name: 'Mathematics',
          },
          {
            exam_name: 'Final English Literature',
            date: '2025-07-05',
            time: '02:00 PM',
            subject_name: 'English Literature',
          },
          {
            exam_name: 'Physics Practical',
            date: '2025-06-25',
            time: '10:00 AM',
            subject_name: 'Physics',
          },
        ];
        setFutureExams(mockExams);

        const mockActivities = [
          {
            title: 'Science Fair Project',
            location: 'School Auditorium',
            date: '2025-06-15',
            time: '01:00 PM',
            description: 'Presentation of science fair projects.',
          },
          {
            title: 'Debate Club Meeting',
            location: 'Library',
            date: '2025-06-10',
            time: '03:30 PM',
            description: 'Weekly debate practice.',
          },
        ];
        setClassActivities(mockActivities);

        // --- End of Mock Data ---

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (!email) return <p className="text-danger">Email is missing. Please log in.</p>;
  if (loading) return <p className="text-secondary">Loading your personalized dashboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4 animate__animated animate__fadeIn">
      <h1 className="text-center text-primary fw-bold mb-5">Student Dashboard</h1>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="bg-white p-4 p-md-5 rounded shadow h-100">
            <h2 className="text-primary fw-bold fs-4 mb-4 border-bottom pb-2">📅 My Class Schedule</h2>
            {schedule.length > 0 ? (
              <ul className="list-unstyled">
                {schedule.map((cls, index) => (
                  <ClassItem key={index} cls={cls} />
                ))}
              </ul>
            ) : (
              <p className="text-muted">No classes scheduled for now. Check back soon!</p>
            )}
          </div>
        </div>

       
        <div className="col-lg-6">
          <div className="bg-white p-4 p-md-5 rounded shadow h-100">
            <h2 className="text-info fw-bold fs-4 mb-4 border-bottom pb-2">📚 Future Exams</h2>
            {futureExams.length > 0 ? (
              <ul className="list-unstyled">
                {futureExams.map((exam, index) => (
                  <ExamItem key={index} exam={exam} />
                ))}
              </ul>
            ) : (
              <p className="text-muted">No upcoming exams. Enjoy your break!</p>
            )}
          </div>
        </div>

      
        <div className="col-12">
          <div className="bg-white p-4 p-md-5 rounded shadow">
            <h2 className="text-success fw-bold fs-4 mb-4 border-bottom pb-2">🎉 Class Activities</h2>
            {classActivities.length > 0 ? (
              <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                {classActivities.map((activity, index) => (
                  <div key={index} className="col-md-6 col-lg-4 p-2"> 
                     <ActivityItem activity={activity} />
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-muted text-center">No class activities planned. Stay tuned!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;