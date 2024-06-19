const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLoginInput = [
  check('username')
    .exists({ values: 'falsy' })
    .withMessage("Please enter a username"),
  check('password')
    .exists({ values: 'falsy' })
    .withMessage('Please enter a password'),
  handleValidationErrors
];

module.exports = validateLoginInput;