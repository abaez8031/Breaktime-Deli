const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateSuggestionInput = [
  check("userId")
  .exists({values: 'falsy'}).withMessage("You must be logged in"),
  check("text")
  .exists({values: 'falsy'}).withMessage("Please fill out the suggestion")
  .isLength({min: 5}).withMessage("Suggestion is too short"),
  handleValidationErrors
]

module.exports = validateSuggestionInput;