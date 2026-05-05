const { body, param } = require('express-validator');

const updateStudentValidation = [
  param('id').isInt({ min: 1 }).withMessage('Valid student ID is required'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body().custom((val, { req }) => {
    if (!req.body || (!req.body.name && !req.body.email)) {
      throw new Error('At least one of name or email is required for update');
    }
    return true;
  }),
];

const createExamValidation = [
  body('name').trim().notEmpty().withMessage('Exam name is required'),
  body('date').notEmpty().withMessage('Exam date is required'),
  body('subject_id').isInt({ min: 1 }).withMessage('Valid subject_id is required'),
];

module.exports = {
  updateStudentValidation,
  createExamValidation,
};
