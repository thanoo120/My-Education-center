import React, { useEffect, useState } from 'react';
import { getStudentProfile } from '../services/studentService';

function StudentProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      const data = await getStudentProfile();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>🧑‍🎓 My Profile</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Class:</strong> {profile.classroom}</p>
        <p><strong>Subjects:</strong> {profile.subjects?.join(', ')}</p>
      </div>
    </div>
  );
}

export default StudentProfile;
