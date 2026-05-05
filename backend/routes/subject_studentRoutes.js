const express = require('express');
const router = express.Router();
const subjectStudentController = require('../controllers/student_subjectController');

router.post('/set', subjectStudentController.createSubjectStudent);

module.exports = router;
