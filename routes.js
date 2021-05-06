//Required Packages
const express = require('express');
const userController = require('./controllers/user.controller');
const productCategoryController = require('./controllers/productCategory.controller');
const productController = require('./controllers/product.controller');
const filterController = require('./controllers/filter.controller');
const cartController = require('./controllers/cart.controller');
const orderController = require('./controllers/orders.controller');
const passport = require('passport');
const userRouter = express.Router();

//For protected routes
const option =passport.authenticate('jwt', {
  session: false
})

//Routes
userRouter.post('/', userController.create);
userRouter.get('/login/auth', option, userController.auth);
userRouter.post('/login', userController.loginFunction);
userRouter.post('/logout', userController.logout);
userRouter.post('/category/add',option, productCategoryController.addCategory);
userRouter.get('/category/', productCategoryController.getProductCategories);
userRouter.get('/product/', productController.getProducts);
userRouter.get('/product/:id', productController.getProduct);
userRouter.post('/product/add',option, productController.addProduct);
userRouter.get('/category/:id', filterController.getProductByCategories);
userRouter.get('/categoryById/:id', productCategoryController.getCategory);
userRouter.post('/cart',option,cartController.addItems);
userRouter.get('/cart',option,cartController.cartItems);
userRouter.post('/cart/id',option,cartController.getCartById);
userRouter.put('/cart/empty',option,cartController.emptyCart);
userRouter.put('/cart/update',option,cartController.updateCart);
userRouter.post('/order/add',option,orderController.addOrder);
userRouter.post('/order',option,orderController.ordersByEmail);

//define routes function
const routes = (app) => {

  //set the path and router to be used for requests on those paths 
  app.use('/user', userRouter);

  //On home(localhost:8081/)
  app.get('/', (req, res) => {
    return res.send({
      message: "User Service Up!"
    });
  })
}

module.exports = routes;