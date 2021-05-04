const {
  Product
} = require('../models');
const {
  Category
} = require('../models');

//Callack function for path localhost:8081/user/category/:id
const getProductByCategories = async (req, res) => {
  const {
    id
  } = req.params;
  let status;
  let message;

  try {
    const prod = await Product.find({
      categoryId: id
    });
    status = 200;
    message = prod;

  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  //send the response back to the front end
  res.status(status).send({
    message
  });
}

module.exports = {
  getProductByCategories
}