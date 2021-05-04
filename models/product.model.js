const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Product Schema
const Product = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  categoryId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//Export Category Schema
module.exports = mongoose.model('Product', Product);