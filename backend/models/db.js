const mysql = require('mysql2/promise'); // Use promise-based connection

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'DKptWaIs21@TH',
  database: 'education_db'
});

module.exports = db;
