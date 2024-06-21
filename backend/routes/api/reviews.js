const express = require("express");
const Review = require("../../models/Review");
const router = express.Router();
const ValidateReviewInput = require("../../validations/Review");

router.get('/', async (req,res, next) => {
  try {
    const reviews = await Review.find({}).populate("userId", "username");
    res.json(reviews)
  } catch(err) {
    next(err)
  }
})

router.post('/', ValidateReviewInput, async(req,res,next) => {
  const { rating, text } = req.body;
  const review = new Review({
    userId: req.user._id,
    rating,
    text
  })
  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
});

router.delete("/:id", async (req,res,next) => {
  const { id } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    res.json(deletedReview)
  } catch(err) {
    next(err)
  }
})

router.patch('/:id', ValidateReviewInput, async (req,res,next) => {
  const { id } = req.params;
  const { rating, text } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { $set: {rating, text} }, { new: true, runValidators: true })
    if (!updatedReview) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      return next(err)
    }
    res.json(updatedReview);
  } catch(err) {
    next(err)
  }
})

module.exports = router;