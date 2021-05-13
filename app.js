//Call all required node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const PORT = 8081; //set the port for server

require('dotenv').config(); //allows us to access the files on the system by sending environment variable

//Create the express application
const app = express();

//Allow cross-origin resource sharing on the app
app.use(cors())

//Allow app to pass the json data and encode urls using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// Pass the global passport object into the configuration function
require('./middleware')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

//send the app to routes
routes(app);

//connect to mongoDatabse
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});