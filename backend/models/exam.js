const db = require('../models/db');


const ExamModel = {
  
  createExam: ({ id,name, date, subject_id }) => {
    return db.query(
      'INSERT INTO exams (id,name, date, subject_id) VALUES (?, ?, ?,?)',
      [id,name, date, subject_id]
    );
  },

  getAllExams: () => {
    return db.query('SELECT * FROM exams');
  },

  getAllStudentsWithMarks: () => {
    return db.query(
      `SELECT s.name, s.email, em.marks, e.date
       FROM students s
       JOIN exam_marks em ON s.email = em.student_email
       JOIN exams e ON em.exam_id = e.id
       ORDER BY s.email, e.date ASC`
    );
  },
  getStudentMarks: (student_email) => {
    return db.query(
      `SELECT em.marks, e.name AS exam_name, e.date
       FROM exam_marks em
       JOIN exams e ON em.exam_id = e.id
       WHERE em.student_email = ?`,
      [student_email]
    );
  },

  getSubjectAnalysis: () => {return db.query(`
 SELECT subj.subject_name   AS subject,
         AVG(em.marks)       AS average,
         MAX(em.marks)       AS highest
  FROM exam_marks em
  JOIN exams   e   ON em.exam_id  = e.id
  JOIN subject subj ON e.subject_id = subj.subject_id
  GROUP BY subj.subject_name
  ORDER BY subj.subject_name;
`);},


  
};

module.exports = ExamModel;
