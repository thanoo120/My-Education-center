const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation results from express-validator.
 * Sends 400 with first error message if validation failed.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true })[0];
    const message = firstError?.msg || 'Validation failed';
    return res.status(400).json({ message, errors: errors.array() });
  }
  next();
};

module.exports = { handleValidationErrors };
