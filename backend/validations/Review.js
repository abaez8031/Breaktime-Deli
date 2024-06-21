const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const User = require("../models/User");
const Review = require("../models/Review")

const ValidateReviewInput = [
  check("rating")
  .exists({ values: 'falsy' }).withMessage("Please enter a rating")
  .isFloat({min: 1, max: 5}).withMessage("Rating scale is 1-5"),
  check("text")
  .exists({values: 'falsy'}).withMessage("Please give a reason for your review"),
  check("userId")
  .exists({values: 'falsy'}).withMessage("You must be logged in to create a review")
  .custom(async userId => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user ID")
    }
    const existingReview = await Review.findOne({userId});
    if(existingReview) {
      throw new Error("You have already written us a review")
    }
    return true
  }),
  handleValidationErrors
]

module.exports = ValidateReviewInput;