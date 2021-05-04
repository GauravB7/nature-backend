const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Category Schema
const Category = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//Export Category Schema
module.exports = mongoose.model('Category', Category);