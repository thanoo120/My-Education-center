const db = require('../models/db');

const parentModel = {

  createParent: (data, conn = null) => {
    const { parent_id, parent_name, email, password, student_id, parent_code } = data;
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'INSERT INTO parent (parent_id, parent_name, email, password, student_id, parent_code) VALUES (?, ?, ?, ?, ?, ?)',
      [parent_id, parent_name, email, password, student_id || null, parent_code]
    );
  },

  getAllParents: () => {
    return db.query('SELECT * FROM parent');
  },

  getParent: (parent_id) => {
    return db.query(
      'SELECT * FROM parent WHERE parent_id = ?',
      [parent_id]
    );
  },

  getParentByStudentId: (student_id) => {
    return db.query(
      'SELECT * FROM parent WHERE student_id = ?',
      [student_id]
    );
  }
};

module.exports=parentModel;