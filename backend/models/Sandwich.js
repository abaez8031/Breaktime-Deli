const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
  bread: {
    type: String,
    required: true
  },
  meat: {
    type: [String],
  },
  cheese: {
    type: [String],
  },
  veggies: {
    type: [String],
  },
  eggs: { 
    type: Number, 
    default: 0
  },
  condiments: {
    type: [String],
  },
  hot: {
    type: Boolean,
    default: false
  },
  toasted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sandwich', sandwichSchema);