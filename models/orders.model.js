const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema
const Orders = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  details: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

//Export User Schema
module.exports = mongoose.model('Orders', Orders);