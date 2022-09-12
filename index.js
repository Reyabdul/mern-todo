const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

//handles CORS issues that may occur when using APIs
    //ref: "https://codeutility.org/how-does-access-control-allow-origin-header-work/"
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //next() -  returns an object with two properties done and value
    //ref "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next"
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Express');
});

//listening to port and see if it connects
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});