const db = require('../models/db');

const Student = {

  create: (data, conn = null) => {
    const { id, name, email, password, student_code } = data;
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'INSERT INTO students (id, name, email, password, student_code) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, student_code]
    );
  },

  findById: (id) => {
    return db.query('SELECT * FROM students WHERE id = ?', [id]);
  },

  updateById: (id, updatedData) => {
    const { name, email } = updatedData;
    return db.query(
      'UPDATE students SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
  },

  updateByEmail: (email, updatedData) => {
    const { name, profile_image_url } = updatedData;
    return db.query(
      'UPDATE students SET name = ?, profile_image_url = ? WHERE email = ?',
      [name, profile_image_url, email]
    );
  },

 
  deleteById: (id) => {
    return db.query('DELETE FROM students WHERE id = ?', [id]);
  },
  
  getAllStudents: () => {
    return db.query('SELECT s.id, s.name, s.email, s.password FROM students s');
  },
};

module.exports = Student;
