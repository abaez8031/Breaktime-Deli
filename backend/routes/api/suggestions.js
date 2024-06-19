const express = require("express");
const router = express.Router();
const Suggestion = require("../../models/Suggestion")
const validateSuggestionInput = require("../../validations/Suggestion");

router.get("/", async (req,res,next) => {
  try {
    const suggestions = await Suggestion.find({});
    res.json(suggestions)
  } catch(err) {
    next(err)
  }
})

router.post("/", validateSuggestionInput, async (req,res,next) => {
  const { text } = req.body;
  const suggestion = new Suggestion({
    userId: req.user._id,
    text
  })
  try {
    const savedSuggestion = await suggestion.save();
    res.status(201).json(savedSuggestion)
  } catch(err) {
    next(err)
  }
})

router.delete("/:id", async (req,res,next) => {
  const { id } = req.params;
  try {
    const deletedSuggestion = await Suggestion.findByIdAndDelete(id);
    res.json(deletedSuggestion);
  } catch(err) {
    next(err)
  }
})