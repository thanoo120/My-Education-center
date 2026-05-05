const db = require('../models/db');
const Subject=require('../models/subject');
const Student_Subject=require('../models/student_subjects');

exports.getFullSubjectsDetails = async (req, res) => {
  try {
    const [rows] = await Subject.getFullSubjectsDetails();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error });
  }
};

exports.getTutorDetailsForSubject = async(req, res) => {
     try {
    const [rows] = await Subject.getTutorDetailsForSubject();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error });
  }
}

exports.addSubjectToStudent=async(req, res) =>{
  const {email,subject_id}=req.body;
  
  try{
   const [rows] =await Student_Subject.createSubjectStudent({email,subject_id});
   res.join(rows);
  }
  catch(error){
    res.status(500).json({message:'Error fetching exams',error});
  }
}
