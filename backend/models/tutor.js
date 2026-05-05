const db = require('../models/db');

const Tutor = {
  createTutor: (data, conn = null) => {
    const { tutor_id, tutor_name, email, password, tutor_code } = data;
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'INSERT INTO tutor (tutor_id, tutor_name, email, password, tutor_code) VALUES (?, ?, ?, ?, ?)',
      [tutor_id, tutor_name, email, password, tutor_code]
    );
  },

  getAllTutors: () => {
    return db.query('SELECT * FROM tutor');
  },

  getAllTutorsBySubjects: () => {
    return db.query(`
      SELECT t.tutor_id, t.tutor_name, t.email, s.subject_name
      FROM tutor t
      LEFT JOIN subject s ON t.tutor_id = s.tutor_id
    `);
  },

  getTutor: (tutor_id) => {
    return db.query(
      'SELECT * FROM tutor WHERE tutor_id = ?',
      [tutor_id]
    );
  },

  getTutorInformation: (tutor_id) => {
    return db.query(
      `SELECT t.tutor_name, ts.subject_name, ts.experience, ts.description 
       FROM tutor t 
       INNER JOIN tutor_subject ts ON t.tutor_id = ts.tutor_id 
       WHERE t.tutor_id = ?`,
      [tutor_id]
    );
  },

  createTutorForSubject: (tutor_id, subject_name, experience, description, conn = null) => {
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'INSERT INTO tutor_subject (tutor_id, subject_name, experience, description) VALUES (?, ?, ?, ?)',
      [tutor_id, subject_name, experience, description]
    );
  },

  getTutorsForAdmin: () => {
    return db.query(`
      SELECT 
        t.tutor_id,
        t.tutor_name,
        t.email,
        t.tutor_code,
        GROUP_CONCAT(ts.subject_name ORDER BY ts.subject_name SEPARATOR ', ') AS subjects
      FROM tutor t
      LEFT JOIN tutor_subject ts ON ts.tutor_id = t.tutor_id
      GROUP BY t.tutor_id, t.tutor_name, t.email, t.tutor_code
      ORDER BY t.tutor_id DESC
    `);
  },

  updateTutor: (tutor_id, tutor_name, email, tutor_code, conn = null) => {
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'UPDATE tutor SET tutor_name = ?, email = ?, tutor_code = ? WHERE tutor_id = ?',
      [tutor_name, email, tutor_code, tutor_id]
    );
  },

  deleteTutorSubjects: (tutor_id, conn = null) => {
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn('DELETE FROM tutor_subject WHERE tutor_id = ?', [tutor_id]);
  },

  deleteTutor: (tutor_id, conn = null) => {
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn('DELETE FROM tutor WHERE tutor_id = ?', [tutor_id]);
  }
};

module.exports = Tutor;
