const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  text: {
    type: String,
    required: true
  },
  
}, {
  timestamps: true
})

module.exports = mongoose.model("Review", reviewSchema);