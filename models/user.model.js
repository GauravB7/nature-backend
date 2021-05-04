const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema
const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//Export User Schema
module.exports = mongoose.model('User', User);