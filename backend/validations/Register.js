const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRegisterInput = [
  check('username')
    .exists({ values: 'falsy' })
    .withMessage("Please enter a username")
    .isLength({ min: 2, max: 30 })
    .withMessage('Username is invalid'),
  check('password')
    .exists({ values: 'falsy' }).withMessage("Please enter a password")
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  handleValidationErrors
];

module.exports = validateRegisterInput;