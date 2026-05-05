const db = require('./db');

const MessageModel = {
  unread: () => db.query(`SELECT * FROM messages WHERE replied = 0 ORDER BY created_at DESC`),

  reply: ({ id, text }) =>
    db.query('UPDATE messages SET reply = ?, replied = 1, replied_at = NOW() WHERE id = ?', [text, id]),

  createIncoming: ({ senderRole, senderName, content }) =>
    db.query('INSERT INTO messages(senderRole, senderName, content) VALUES (?,?,?)',
      [senderRole, senderName, content]),
};

module.exports = MessageModel;
