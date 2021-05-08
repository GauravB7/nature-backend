const {
  User
} = require('../models');
const jwt = require('jsonwebtoken');
const {
  mongoUrl,
  privateKey
} = require('../config');
const utils = require('../lib/utils');

//Callack function for path localhost:8081/user/
const create = async (req, res) => {
  console.log('create User');

  //Extract name,email and password from request body
  const {
    name,
    email,
    password
  } = req.body;

  let status;
  let message;

  try {
    const user = new User({
      name: name,
      email: email,
      password: utils.encryptPass(password) //call encryptPass function in utils to store encrypted password

    });
    await user.save();
    status = 200;
    message = 'User created successfully';
  } catch (err) {
    //check if user already exists in the database or not
    if (err.code === 11000) {
      return res.status(401).send({
        message: 'User already exists'
      });
    }
    //If some other error
    status = 400;
    message = 'Bad request';
  }
  //Send the response to the user
  res.status(status).send({
    message
  });
}


const encrypt = (t) => t;

//Callack function for path localhost:8081/user/login
const loginFunction = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const usersInfo = await User.find({
    email: email
  });

  if (usersInfo[0] !== undefined) {
    if (utils.decryptPass(usersInfo[0].password) === encrypt(password)) {
      // login should be successfull
      const tokenObject = utils.issueJWT(usersInfo[0]);
      console.log(tokenObject.token)
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        name:usersInfo[0].name
      });
    } else {
      // login pwd / email mismatch
      res.status(401).send({
        message: "Unauthorized Access"
      });
    }
  } else {
    // user does not exit;
    res.status(404).send({
      message: "Not found"
    });
  }
}

//Callack function for path localhost:8081/user/login/auth
const auth = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!"
  });
}

//Callack function for path localhost:8081/user/logout
const logout = (req, res, next) => {
  res.status(200).send({
    message: 'Logged Out successfully'
  });
}


module.exports = {
  create,
  auth,
  loginFunction,
  logout
}