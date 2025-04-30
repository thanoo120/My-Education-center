// Dummy data and API calls for Tutor

export async function getAssignedClasses() {
    return [
      { subject: 'Mathematics', time: 'Mon 10:00AM - 11:00AM', classroom: 'Room 101' },
      { subject: 'Science', time: 'Tue 12:00PM - 1:00PM', classroom: 'Room 102' },
    ];
  }
  
  export async function getEnrolledStudents() {
    return [
      { name: 'Alice', email: 'alice@example.com', classroom: 'Class A' },
      { name: 'Bob', email: 'bob@example.com', classroom: 'Class A' },
    ];
  }
  
  export async function sendFeedback(message) {
    try {
      console.log('Sending feedback:', message);
      return true;
    } catch (error) {
      console.error('Error sending feedback', error);
      return false;
    }
  }
  