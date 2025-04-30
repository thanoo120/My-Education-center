// Dummy service for student

export async function getStudentProfile() {
    return {
      name: 'John Doe',
      classroom: 'Class B',
      subjects: ['Math', 'Science', 'History']
    };
  }
  
  export async function getAttendanceRecords() {
    return [
      { date: '2025-04-01', status: 'Present' },
      { date: '2025-04-02', status: 'Absent' },
      { date: '2025-04-03', status: 'Present' },
    ];
  }
  
  export async function getAcademicPerformance() {
    return [
      { subject: 'Math', grade: 'A' },
      { subject: 'Science', grade: 'B+' },
      { subject: 'History', grade: 'A-' },
    ];
  }
  
  export async function getFeeStatus() {
    return {
      total: 1000,
      paid: 700,
      pending: 300
    };
  }
  