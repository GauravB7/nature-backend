const {
    Cart
  } = require('../models');
  
  //Callack function for path localhost:8081/user/category/
  const cartItems = async (req, res) => {
    try {
      message = await Cart.find();
      status = 200;
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({
      message: message.map((cat) => ({
        email:cat.email,
        products:cat.products
      }))
    });
  }

  function exists(products,productsToAdd){
      for(let i=0;i<products.length;i++){
          if(products[i][0]==productsToAdd[0]){
              return true;
          }
      }
      return false;
  }
  
  //Callack function for path localhost:8081/user/category/add
  const addItems = async (req, res) => {
    console.log('Add to  Cart');
  
    const {
      email,
      productsToAdd
    } = req.body;
  
    let status;
    let message;
  
    try {
        var cat = await Cart.findOne({
            email: email
        });
        if(cat==undefined){
            const cart = new Cart({
                email: email,
                products: productsToAdd
              });
              await cart.save();
              status = 200;
              message = 'Cart created successfully';
        }
      else{
          message="";
          let products=cat.products;
          if(exists(products,productsToAdd[0])){
            cat.products=products;
            await cat.save();
          }
          else{
            products.push(productsToAdd[0]);
            cat.products=products;
            await cat.save();
          }
          
         status=200;
         message+='Cart updated successfully';
      }
     
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
  const getCartById = async (req, res) => {
    const {
      email
    } = req.body;
  
    let status;
    let message;
  
    try {
      const cat = await Cart.find({
        email: email
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

  const updateCart = async (req,res)=>{
    const {
      email,
      productsToUpdate
    } = req.body;

    let status;
    let message;

    try{
      //const cat = await Cart.updateOne({email:email},{products:[]});
      await Cart.updateOne({email:email},{products:productsToUpdate});
      //await cat.save();
      status=200;
      message="Cart updated successfully";
      console.log(message);
    }
    catch(err){
      status=400;
      message=err;
    }
    return res.status(status).send(message);

  }

  const emptyCart = async (req,res)=>{
    const {
      email
    } = req.body;

    let status;
    let message;

    try{
      //const cat = await Cart.updateOne({email:email},{products:[]});
      await Cart.updateOne({email:email},{products:[]});
      //await cat.save();
      status=200;
      message="Products removed from cart successfully";
      console.log(message);
    }
    catch(err){
      status=400;
      message=err;
    }
    return res.status(status).send(message);

  }
  
  module.exports = {
    cartItems,
    addItems,
    getCartById,
    emptyCart,
    updateCart
  }