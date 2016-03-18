/**
*  Main app file
*/
'use strict';

//dependencies
var express  = require ('express');
var mongoose = require ('mongoose');
var config   = require ('./config/enviroment');
var mqtt    = require ('./mqttServer');

//connect to MongoDB
mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
mongoose.connection.on('error', function(err){
  console.log('MongoDB connection error: ' + err);
  process.exit(-1);
});

//setup server
require('./seedCSV/csv_read');
var app = express();
require ('./config/express')(app);
require ('./routes') (app);

app.listen(config.port);
console.log('Server listening on port: ' + config.port);
module.exports = app;
