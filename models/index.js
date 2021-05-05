//Import all Schemas
const User = require('./user.model');
const Category = require('./productCategory.model');
const Product = require('./product.model');
const Cart = require('./cart.model');
const Orders = require('./orders.model');

//Export all schemas
module.exports = {
    User,
    Category,
    Product,
    Cart,
    Orders
};