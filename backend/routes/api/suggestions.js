const express = require("express");
const router = express.Router();
const Suggestion = require("../../models/Suggestion")

router.get("/", async (req,res,next) => {
  try {
    const suggestions = await Suggestion.find({});
    res.json(suggestions)
  } catch(err) {
    next(err)
  }
})

