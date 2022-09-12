const express = require('express');
const { default: mongoose, connect } = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const DBPassword = "Gemini1987";
const uri = `mongodb+srv://reyabdul:${DBPassword}@cluster0.q1o1sfb.mongodb.net/?retryWrites=true&w=majority`;
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;



//Connect to the database
    //also ref: "https://www.makeuseof.com/mongodb-cluster-cloud-free-setup/"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });

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
app.use('api', routes)

app.use((req, res, next) => {
  console.log(err);
  next();
});

//listening to port and see if it connects
app.listen(port, () => {
  connectMongo()  
  console.log(`Server running on port ${port}`);
});