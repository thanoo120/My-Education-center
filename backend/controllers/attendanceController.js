const Attendance = require('../models/attendence');

exports.markAttendance = async (req, res) => {
  try {
    const { student_email, course_id, date } = req.body;
    if (student_email && course_id && date) {
      const [existing] = await Attendance.getByStudentCourseDate(student_email, course_id, date);
      if (existing && existing.length > 0) {
        return res.status(409).json({ message: 'Attendance for this student, course and date already recorded.' });
      }
    }
    await Attendance.markAttendance(req.body);
    res.status(201).json({ message: 'Attendance recorded successfully.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Duplicate attendance record.' });
    }
    res.status(500).json({ message: 'Error recording attendance.', error: error.message });
  }
};


exports.getStudentAttendance = async (req, res) => {
  const { student_email, from, to } = req.query;
  if (!student_email || !from || !to) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  try {
    const [rows] = await Attendance.getStudentAttendance(student_email, from, to);
    res.json({ attendance: rows }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance.', error });
  }
};

// ✅ Controller to get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const [rows] = await Attendance.getAllAttendance();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance.', error });
  }
};
