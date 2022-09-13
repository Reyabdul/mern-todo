const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config({path: './.env'});

const app = express();

const port = process.env.PORT || 6000;

//Connect to the database
    //also ref: "https://www.makeuseof.com/mongodb-cluster-cloud-free-setup/"
mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

//handles CORS issues that may occur when using APIs
    //ref: "https://codeutility.org/how-does-access-control-allow-origin-header-work/"
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //next() -  returns an object with two properties done and value
    //ref "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next"
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((req, res, next) => {
  res.send('Welcome to Express');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});