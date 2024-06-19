const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const ValidateReviewInput = [
  check("rating")
  .exists({ values: 'falsy' }).withMessage("Please enter a number")
  .isFloat({min: 1, max: 10}).withMessage("Rating scale is 1-10"),
  check("text")
  .exists().withMessage("Please give a reason for your review"),
  handleValidationErrors
]

module.exports = ValidateReviewInput;