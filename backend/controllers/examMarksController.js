const ExamMarks = require('../models/examMarks');

exports.addMark = async (req, res) => {
  try {
    const { student_email, exam_id, marks, high_mark } = req.body;
    const [existing] = await ExamMarks.getStudentExamMark(student_email, exam_id);
    if (existing && existing.length > 0) {
      return res.status(409).json({ message: 'Marks for this student and exam already exist. Use update to change.' });
    }
    await ExamMarks.addMark({ student_email, exam_id, marks, high_mark });
    res.status(201).json({ message: 'Marks added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Duplicate exam marks for this student and exam.' });
    }
    res.status(500).json({ message: 'Error adding marks', error: error.message });
  }
};

exports.getStudentMarks = async (req, res) => {
  try {
    const { student_email } = req.query;
    const [rows] = await ExamMarks.getStudentMarks(student_email);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching marks', error });
  }
};

exports.getStudentExamMark = async (req, res) => {
  try {
    const { student_email, exam_id } = req.query;
    const [rows] = await ExamMarks.getStudentExamMark(student_email, exam_id);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam mark', error });
  }
};
