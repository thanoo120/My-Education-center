const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getAssignedClasses,
  getStudentsInClass,
  getClassAttendance,
  getClassPerformance,
  giveFeedback,
  sendAnnouncement,
  getAllTutorsBySubjects,
  createSubjectForTutors,
  getTutorInformation,
  getTutorsForAdmin,
  createTutorByAdmin,
  updateTutorByAdmin,
  deleteTutorByAdmin
} = require('../controllers/tutorController');

router.get('/assigned-classes', authenticateToken, getAssignedClasses);
router.get('/class-students/:classId', authenticateToken, getStudentsInClass);
router.get('/class-attendance/:classId', authenticateToken, getClassAttendance);
router.get('/class-performance/:classId', authenticateToken, getClassPerformance);
router.post('/feedback', authenticateToken, giveFeedback);
router.post('/announcement', authenticateToken, sendAnnouncement);
router.get('/information/:tutor_id', getTutorInformation);
router.post('/create', authenticateToken, createSubjectForTutors);
router.get('/tutor-subjects', getAllTutorsBySubjects);
router.get('/admin', getTutorsForAdmin);
router.post('/admin', createTutorByAdmin);
router.put('/admin/:tutor_id', updateTutorByAdmin);
router.delete('/admin/:tutor_id', deleteTutorByAdmin);

module.exports = router;
