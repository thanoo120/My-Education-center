const Exam = require('../models/exam');

exports.createExam = async (req, res) => {
  try {
    await Exam.createExam(req.body);
    res.status(201).json({ message: 'Exam created successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Duplicate exam (ID or unique fields already exist).' });
    }
    res.status(500).json({ message: 'Error creating exam', error: error.message });
  }
};


exports.getAllExams = async (req, res) => {
  try {
    const [rows] = await Exam.getAllExams();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error });
  }
};

exports.getStudentExam = async (req, res) => {
  ;
  try {
    const [rows] = await Exam.getStudentExam(req.params.student_email);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student exam', error });
  }
};

exports.getStudentPerformance = async (req, res) => {
  try {
    const [rows] = await Exam.getAllStudentsWithMarks();

    const studentMap = {};

    rows.forEach((row) => {
      const key = row.student_email ?? row.email;
      if (!key) return;
      if (!studentMap[key]) {
        studentMap[key] = {
          name: row.name,
          marks: [],
        };
      }
      studentMap[key].marks.push({
        marks: row.marks,
        date: row.date,
      });
    });

    const result = Object.values(studentMap).map((student) => {
      const status = analyzePerformance(student.marks);
      return {
        name: student.name,
        status,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching student performance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


function analyzePerformance(marks) {
  const total = marks.reduce((sum, entry) => sum + entry.marks, 0);
  const avg = total / marks.length;

  if (avg >= 75) return 'Excellent';
  if (avg >= 50) return 'Average';
  return 'Needs Improvement';
}


exports. getStudentMarks=async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const [results] = await Exam.getStudentMarks(email);
    res.json(results);
  } catch (error) {
    console.error('Error fetching exam results:', error);
    res.status(500).json({ error: 'Failed to fetch exam results' });
  }
};
exports.subjectAnalysis = async (_req, res) => {
  try {
    const [rows] = await Exam.getSubjectAnalysis(); // Add await here
    res.json(rows);
  } catch (e) {
    console.error('Error fetching subject analysis:', e);
    res.status(500).json({ error: 'Server error' });
  }
};
