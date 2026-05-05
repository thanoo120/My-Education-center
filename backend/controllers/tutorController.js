const db = require('../models/db');
const tutor = require('../models/tutor');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.getAssignedClasses = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, class_name, subject FROM classes WHERE tutor_id = ?',
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentsInClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const [rows] = await db.execute(
      'SELECT id, name, email FROM students WHERE class_id = ?',
      [classId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClassAttendance = async (req, res) => {
  try {
    const classId = req.params.classId;
    const [rows] = await db.execute(`
      SELECT s.name, a.date, a.status
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE s.class_id = ?
    `, [classId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClassPerformance = async (req, res) => {
  try {
    const classId = req.params.classId;
    const [rows] = await db.execute(`
      SELECT s.name, p.subject, p.marks, p.grade
      FROM performance p
      JOIN students s ON p.student_id = s.id
      WHERE s.class_id = ?
    `, [classId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.giveFeedback = async (req, res) => {
  try {
    const { studentId, feedback } = req.body;
    await db.execute(
      'INSERT INTO feedback (student_id, tutor_id, feedback) VALUES (?, ?, ?)',
      [studentId, req.user.id, feedback]
    );
    res.json({ message: 'Feedback sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendAnnouncement = async (req, res) => {
  try {
    const { classId, announcement } = req.body;
    await db.execute(
      'INSERT INTO announcements (class_id, tutor_id, announcement) VALUES (?, ?, ?)',
      [classId, req.user.id, announcement]
    );
    res.json({ message: 'Announcement sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllTutorsBySubjects = async (req, res) => {
  try {
    const [rows] = await tutor.getAllTutorsBySubjects();
    res.json(rows);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTutorInformation = async (req, res) => {
  try {
    const { tutor_id } = req.params;
    const [rows] = await tutor.getTutorInformation(tutor_id);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error getting tutor information:', error);
    res.status(500).json({ error: 'Failed to get tutor information' });
  }
};

exports.createSubjectForTutors = async (req, res) => {
  try {
    const { tutor_id, subject_name, experience, description } = req.body;
    await tutor.createTutorForSubject(tutor_id, subject_name, experience, description);
    res.status(201).json({ message: 'Subject assigned successfully.' });
  } catch (error) {
    console.error('Error assigning subject:', error);
    res.status(500).json({ error: 'Failed to assign subject' });
  }
};

exports.getTutorsForAdmin = async (req, res) => {
  try {
    const [rows] = await tutor.getTutorsForAdmin();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching tutors for admin:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

exports.createTutorByAdmin = async (req, res) => {
  let conn;
  try {
    const { tutor_name, email, tutor_code, subject_name } = req.body;
    if (!tutor_name || !email || !tutor_code) {
      return res.status(400).json({ message: 'Tutor ID, name, and email are required' });
    }

    conn = await db.getConnection();
    await conn.beginTransaction();

    const [existingUsers] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length) {
      await conn.rollback();
      return res.status(409).json({ message: 'Email already in use' });
    }

    const generatedPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const [userResult] = await conn.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [tutor_name, email, hashedPassword, 'tutor']
    );

    await tutor.createTutor(
      {
        tutor_id: userResult.insertId,
        tutor_name,
        email,
        password: hashedPassword,
        tutor_code
      },
      conn
    );

    if (subject_name && subject_name.trim()) {
      await tutor.createTutorForSubject(userResult.insertId, subject_name.trim(), 0, '', conn);
    }

    await conn.commit();
    res.status(201).json({ message: 'Tutor created successfully' });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Error creating tutor by admin:', error);
    res.status(500).json({ message: 'Failed to create tutor' });
  } finally {
    if (conn) conn.release();
  }
};

exports.updateTutorByAdmin = async (req, res) => {
  let conn;
  try {
    const { tutor_id } = req.params;
    const { tutor_name, email, tutor_code, subject_name } = req.body;

    if (!tutor_name || !email || !tutor_code) {
      return res.status(400).json({ message: 'Tutor ID, name and email are required' });
    }

    conn = await db.getConnection();
    await conn.beginTransaction();

    const [existingTutor] = await conn.query('SELECT tutor_id FROM tutor WHERE tutor_id = ?', [tutor_id]);
    if (!existingTutor.length) {
      await conn.rollback();
      return res.status(404).json({ message: 'Tutor not found' });
    }

    const [existingEmail] = await conn.query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, tutor_id]
    );
    if (existingEmail.length) {
      await conn.rollback();
      return res.status(409).json({ message: 'Email already in use' });
    }

    await tutor.updateTutor(tutor_id, tutor_name, email, tutor_code, conn);

    await conn.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [tutor_name, email, tutor_id]
    );

    await tutor.deleteTutorSubjects(tutor_id, conn);
    if (subject_name && subject_name.trim()) {
      await tutor.createTutorForSubject(tutor_id, subject_name.trim(), 0, '', conn);
    }

    await conn.commit();
    res.status(200).json({ message: 'Tutor updated successfully' });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Error updating tutor by admin:', error);
    res.status(500).json({ message: 'Failed to update tutor' });
  } finally {
    if (conn) conn.release();
  }
};

exports.deleteTutorByAdmin = async (req, res) => {
  let conn;
  try {
    const { tutor_id } = req.params;
    conn = await db.getConnection();
    await conn.beginTransaction();

    const [existingTutor] = await conn.query('SELECT tutor_id FROM tutor WHERE tutor_id = ?', [tutor_id]);
    if (!existingTutor.length) {
      await conn.rollback();
      return res.status(404).json({ message: 'Tutor not found' });
    }

    await tutor.deleteTutorSubjects(tutor_id, conn);
    await tutor.deleteTutor(tutor_id, conn);
    await conn.query('DELETE FROM users WHERE id = ?', [tutor_id]);

    await conn.commit();
    res.status(200).json({ message: 'Tutor deleted successfully' });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Error deleting tutor by admin:', error);
    res.status(500).json({ message: 'Failed to delete tutor' });
  } finally {
    if (conn) conn.release();
  }
};
