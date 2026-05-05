const subjectStudent = require('../models/student_subjects');

exports.createSubjectStudent = async (req, res) => {
  const { student_email, subject_id } = req.body;

  try {
    const [existing] = await subjectStudent.getSubjectStudent(student_email, subject_id);
    if (existing && existing.length > 0) {
      return res.status(409).json({ message: 'This subject is already assigned to the student.' });
    }
    await subjectStudent.createSubjectStudent({ student_email, subject_id });
    res.status(201).json({ message: 'Subject assigned to student successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'This subject is already assigned to the student.' });
    }
    console.error('Error assigning subject:', error);
    res.status(500).json({ message: 'Failed to assign subject to student' });
  }
};
