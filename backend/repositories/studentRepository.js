const Student = require('../models/student');
const db = require('../models/db');

class StudentRepository {
  async findById(id) {
    return await Student.findById(id);
  }

  async findAll() {
    const [rows] = await Student.getAllStudents();
    return rows;
  }

  async deleteById(id) {
    return await Student.deleteById(id);
  }

  async updateById(id, studentData) {
    return await Student.updateById(id, studentData);
  }

  async getProfile(id) {
    const [rows] = await db.execute('SELECT name, email, class, subjects FROM students WHERE id = ?', [id]);
    return rows[0];
  }

  async getAttendance(id) {
    const [rows] = await db.execute('SELECT date, status FROM attendance WHERE student_id = ?', [id]);
    return rows;
  }

  async getPerformance(email) {
    const [rows] = await db.execute('SELECT subject, marks, grade FROM performance WHERE student_email = ?', [email]);
    return rows;
  }

  async getFees(id) {
    const [rows] = await db.execute('SELECT total_fees, paid_amount, due_amount FROM fees WHERE student_id = ?', [id]);
    return rows[0];
  }

  async getReceipts(id) {
    const [rows] = await db.execute('SELECT receipt_number, amount, date FROM receipts WHERE student_id = ?', [id]);
    return rows;
  }

  async getStudentReports() {
    const [courses] = await db.query('SELECT DISTINCT course_id FROM attendance');

    const reports = await Promise.all(
      courses.map(async ({ course_id }) => {
        const [[attendanceSummary]] = await db.query(
          `SELECT 
             COUNT(*) AS totalClasses,
             SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS presentCount
           FROM attendance
           WHERE course_id = ?`,
          [course_id]
        );

        const attendancePercent = attendanceSummary.totalClasses > 0
          ? ((attendanceSummary.presentCount / attendanceSummary.totalClasses) * 100).toFixed(1) + '%'
          : 'N/A';

        const [[averageScoreRow]] = await db.query(
          `SELECT AVG(em.marks) AS averageScore
           FROM exam_marks em
           JOIN exams e ON em.exam_id = e.id
           WHERE e.subject_id = ?`,
          [course_id]
        );

        const averageScore = averageScoreRow.averageScore !== null
          ? Math.round(averageScoreRow.averageScore)
          : 'N/A';

        return {
          class: `Course ${course_id}`,
          attendance: attendancePercent,
          averageScore
        };
      })
    );
    return reports;
  }
}

module.exports = new StudentRepository();