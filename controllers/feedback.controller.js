const {
    Feedback
  } = require('../models');
  
  
  //Callack function for path localhost:8081/user/
  const createFeedback = async (req, res) => {

    //Extract name,email and password from request body
    const {
      name,
      email,
      comment
    } = req.body;
  
    let status;
    let message;
        try {
            //check if user has already entry in Feedback or not
            var feedback = await Feedback.findOne({
                email: email
            });
            //if user doesn't have a entry in Feedback
            if(feedback==undefined){
                //Create a new document in Feedback collection with specified information
                const feedback = new Feedback({
                    email: email,
                    name:name,
                    Comment:comment
                  });
                  await feedback.save();
                  status = 200;
                  message = 'Feedback created successfully';
            }
          else{
              //If user already given Feedback, update comment
                feedback.Comment=comment;
                await feedback.save();
                status=200;
                 message+='Feedback updated successfully';
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
    createFeedback
}