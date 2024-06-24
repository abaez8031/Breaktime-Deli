const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
  bread: {
    type: String,
    required: true
  },
  meat: {
    type: [String],
    required: true
  },
  cheese: {
    type: [String],
    required: true
  },
  veggies: {
    type: [String],
    required: true
  },
  condiments: {
    type: [String],
    required: true
  },
  hot: {
    type: Boolean,
    default: false
  },
  toasted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sandwich', sandwichSchema);