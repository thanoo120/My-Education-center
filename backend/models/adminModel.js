const db = require('../models/db');


const adminsModel= {
  
  createAdmin: (data, conn = null) => {
    const { admin_id, admin_name, email, password } = data;
    const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
    return queryFn(
      'INSERT INTO admin (admin_id, admin_name, email, password) VALUES (?, ?, ?, ?)',
      [admin_id, admin_name, email, password]
    );
  },

}

module.exports =adminsModel;
