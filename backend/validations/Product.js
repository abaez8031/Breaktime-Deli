const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateProductInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage('Please enter a valid product name'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ gt: 0 })
    .withMessage('Please enter a valid price'),
  handleValidationErrors
];

module.exports = validateProductInput;