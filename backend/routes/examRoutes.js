const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const { createExamValidation } = require('../validators/commonValidators');

router.post('/create', createExamValidation, handleValidationErrors, examController.createExam);

 router.get('exam-results/:email', examController.getStudentExam);
 router.get('/exams', examController.getAllExams);
 router.get('/performance', examController.getStudentPerformance);
 router.get('/results', examController.getStudentMarks);
 router.get('/analysis',examController.subjectAnalysis)
// router.post('/addmark', examController.addMark);    
// router.get('/student/:student_id', examController.getStudentMarks);
// router.get('/student/:student_id/exam/:exam_id', examController.getStudentExamMark);

module.exports = router;

