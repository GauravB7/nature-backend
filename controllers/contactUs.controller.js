const {
    contactUs
  } = require('../models');
  
  
  //Callack function for path localhost:8081/user/
  const createContact = async (req, res) => {
    console.log('create User');
  
    //Extract name,email and password from request body
    const {
      name,
      email,
      query
    } = req.body;
  
    let status;
    let message;
        try {
            //check if user has already entry in contactus or not
            var contact = await contactUs.findOne({
                email: email
            });
            //if user doesn't have a entry in contactUs
            if(contact==undefined){
                //Create a new document in contactUs collection with specified information
                const contact = new contactUs({
                    email: email,
                    name:name,
                    query:query
                  });
                  await contact.save();
                  status = 200;
                  message = 'Contact created successfully';
            }
          else{
              //If user already contacted, update query
                contact.query=query;
                await contact.save();
                status=200;
                 message='Contact updated successfully';
              }
        } 
        catch (err) {
          console.log('Some error occured', err);
          console.log(err.stack);
          status = 400;
          message = 'Bad request';
        }
      
        res.status(status).send({
          message
        });
}

module.exports = {
    createContact
}