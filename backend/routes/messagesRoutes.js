// routes/messages.js
const router = require('express').Router();
const ctrl = require('../controllers/messageController');
router.get('/unread', ctrl.getUnread);
router.post('/:id/reply', ctrl.reply);
module.exports = router;
