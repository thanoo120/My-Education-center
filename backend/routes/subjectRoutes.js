const express = require('express');
const router = express.Router();

const{getTutorDetailsForSubject,getFullSubjectsDetails,addSubjectToStudent}=require('../controllers/subjectController')

router.get('/turorslist',getTutorDetailsForSubject)
router.get('/allsubjects',getFullSubjectsDetails)
router.post('/add',addSubjectToStudent)

module.exports=router;