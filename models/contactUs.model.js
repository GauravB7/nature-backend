const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create ContactUs Schema
const contactUs = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  query: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//Export ContactUs Schema
module.exports = mongoose.model('contactUs', contactUs);