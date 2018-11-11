const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

const app = express();

const mongoose = require('mongoose');

const database = require('./config/database');

const options = {
  // useMongoClient: true,
  // autoIndex: false, // Don't build indexes
  // reconnectTries: 100, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  useNewUrlParser: true
}

// const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

mongoose.connect(database.url, options)
  .then(
    () => {
      console.log("connected to mongoDB")
    },
    (err) => {
      console.log("err", err);
    }
  )

app.use(bearerToken());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(bodyParser.json());

require('./app/routes.js')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 
