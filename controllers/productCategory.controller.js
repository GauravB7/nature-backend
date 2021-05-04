const {
  Category
} = require('../models');

//Callack function for path localhost:8081/user/category/
const getProductCategories = async (req, res) => {
  try {
    message = await Category.find();
    status = 200;
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request'
  }
  res.status(status).send({
    message: message.map((cat) => ({
      id: cat.id,
      name: cat.name
    }))
  });
}

//Callack function for path localhost:8081/user/category/add
const addCategory = async (req, res) => {
  console.log('Add Category');

  const {
    id,
    name
  } = req.body;

  let status;
  let message;

  try {
    const cat = new Category({
      id: id,
      name: name
    });
    await cat.save();
    status = 200;
    message = 'Category created successfully';
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request';
  }

  res.status(status).send({
    message
  });
}

//Callack function for path localhost:8081/user/categoryById/:id
const getCategory = async (req, res) => {
  const {
    id
  } = req.params;

  let status;
  let message;

  try {
    const cat = await Category.find({
      id: id
    });
    status = 200;
    message = cat;

  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({
    message
  });
}

module.exports = {
  getProductCategories,
  addCategory,
  getCategory
}