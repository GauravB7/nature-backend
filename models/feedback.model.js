const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Feedback Schema
const Feedback = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  Comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//Export ContactUs Schema
module.exports = mongoose.model('Feedback', Feedback);