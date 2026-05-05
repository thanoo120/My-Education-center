const Message = require('../models/messageModel');

exports.getUnread = async (_req, res) => {
  const [rows] = await Message.unread();
  res.json(rows);
};

exports.reply = async (req, res) => {
  const id   = req.params.id;
  const text = req.body.text;
  await Message.reply({ id, text });
  res.sendStatus(204);
};
