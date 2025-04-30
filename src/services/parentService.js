// Dummy service for parent dashboard

export async function getStudentProgress() {
    return {
      name: 'John Doe',
      classroom: 'Class B',
      attendance: 92,
      results: [
        { subject: 'Math', grade: 'A' },
        { subject: 'Science', grade: 'B+' },
        { subject: 'History', grade: 'A-' }
      ]
    };
  }
  
  export async function getPerformanceInsights() {
    return {
      strengths: ['Math', 'History'],
      weaknesses: ['Science', 'Public Speaking']
    };
  }
  