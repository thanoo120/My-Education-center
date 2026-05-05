const studentService = require('../services/studentService');

exports.getProfile = async (req, res) => {
  try {
    const profile = await studentService.getStudentProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await studentService.getStudentAttendance(req.user.id);
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPerformance = async (req, res) => {
  try {
    // Note: req.student.email might need to be checked if it exists on the request object
    const performance = await studentService.getStudentPerformance(req.student.email);
    res.json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFees = async (req, res) => {
  try {
    const fees = await studentService.getStudentFees(req.user.id);
    res.json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReceipts = async (req, res) => {
  try {
    const receipts = await studentService.getStudentReceipts(req.user.id);
    res.json(receipts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.findById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getStudentReports = async (req, res) => {
  try {
    const reports = await studentService.getStudentReports();
    res.json(reports);
  } catch (err) {
    console.error('Error in /api/reports-overview:', err);
    res.status(500).json({ error: 'Server Error' });
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await studentService.deleteStudent(studentId);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, email } = req.body;
    await studentService.updateStudent(studentId, { name, email });
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};