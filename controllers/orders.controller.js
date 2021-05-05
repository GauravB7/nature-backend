const {
    Orders
  } = require('../models');

const {Cart} = require('../models');
  
  //Callack function for path localhost:8081/user/order/
  const ordersByEmail = async (req, res) => {

    const {email} = req.body;

    console.log(email);
    try {
      message = await Orders.find({email:email});
      status = 200;
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({
        message: message
    });
  }

  
  
  //Callack function for path localhost:8081/user/order/add
  const addOrder = async (req, res) => {
    console.log('Proceeding to checkout');
  
    const {
      email,
      total_per_item,
      total
    } = req.body;
  
    let status;
    let message;
  
    try {
        var cat = await Orders.findOne({
            email: email
        });
        var today = new Date();
        var date = today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear();
        if(cat==undefined){
            const cart= await Cart.findOne({email:email});
            console.log(cart.products);
            
            const order = new Orders({
                email: email,
                details: [{products:cart.products,total_per_item:total_per_item,total:total,orderedOn:date}]
              });
              await order.save();
              status = 200;
              message = 'Ordered successfully';
        }
      else{
        const cart= await Cart.findOne({email:email});
        cat.details.push({products:cart.products,total_per_item:total_per_item,total:total,orderedOn:date});
        await cat.save();
        status=200;
        message='Orders updated successfully';
      }
     
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(200).send({
      message:message
    });
  }
  
  module.exports = {
    addOrder,
    ordersByEmail
  }