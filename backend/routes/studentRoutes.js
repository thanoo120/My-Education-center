const db=require('../models/db');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { updateStudentValidation } = require('../validators/commonValidators');
const { getProfile, getAttendance, getPerformance, getFees, getReceipts, getAllStudents,getStudentReports,deleteStudent,updateStudent } = require('../controllers/studentController');
const Student_subjectModel = require('../models/student_subjects');
router.get('/reports', getStudentReports);
router.get('/profile',  getProfile);
router.get('/attendance',  getAttendance);
router.get('/performance',  getPerformance);
router.get('/fees',  getFees);
router.get('/receipts', getReceipts);

router.get('/all', getAllStudents);

router.delete('/delete/:id', deleteStudent);
router.put('/update/:id', updateStudentValidation, handleValidationErrors, updateStudent);
router.get('/timetable', async (req, res) => {
  const { email } = req.query;

  console.log('Received timetable request for email:', email); 

  if (!email) {
    return res.status(400).json({ message: 'Email is required as query parameter' });
  }

  try {
    const [timetable] = await Student_subjectModel.findTimetableByEmail(email);

    if (!timetable || timetable.length === 0) {
      return res.status(404).json({ message: 'No subjects found for this student' });
    }

    res.json({ subjects: timetable });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/profile', async (req, res) => {
  const { email } = req.body;
  console.log("Request received with email:", email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [rows] = await db.query('SELECT name FROM students WHERE email = ?', [email]);
    console.log("DB response rows:", rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching student profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
