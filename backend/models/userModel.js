const db = require('./db'); // Adjust the path to your db.js file

const createUser = async (user, conn = null) => {
  const queryFn = conn ? conn.query.bind(conn) : db.query.bind(db);
  const [result] = await queryFn(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.password, user.role]
  );
  return { id: result.insertId, ...user };
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // Return the first matching user
};

module.exports = {
  createUser,
  findUserByEmail,
};
