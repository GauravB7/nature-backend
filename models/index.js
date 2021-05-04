//Import all Schemas
const User = require('./user.model');
const Category = require('./productCategory.model');
const Product = require('./product.model');
const Cart = require('./cart.model');

//Export all schemas
module.exports = {
    User,
    Category,
    Product,
    Cart
};