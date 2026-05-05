const db = require('../models/db');

const PREFIXES = {
  student: 'STU',
  tutor: 'TUT',
  parent: 'PAR',
  admin: 'ADM',
};

/**
 * Get the next auto-generated ID for a role (e.g. STU001, TUT001, PAR001).
 * @param {string} role - One of: student, tutor, parent, admin
 * @returns {Promise<string>} - e.g. 'STU001', 'TUT002'
 */
async function getNextId(role) {
  const prefix = PREFIXES[role];
  if (!prefix) {
    throw new Error(`Unknown role for ID generation: ${role}`);
  }

  const [table] = getTableAndColumn(role);
  const [rows] = await db.query(`SELECT COUNT(*) AS cnt FROM ${table}`);
  const count = (rows && rows[0] && rows[0].cnt) || 0;
  const nextNum = count + 1;
  return `${prefix}${String(nextNum).padStart(3, '0')}`;
}

function getTableAndColumn(role) {
  switch (role) {
    case 'student':
      return ['students'];
    case 'tutor':
      return ['tutor'];
    case 'parent':
      return ['parent'];
    case 'admin':
      return ['admin'];
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}

module.exports = {
  getNextId,
  PREFIXES,
};
