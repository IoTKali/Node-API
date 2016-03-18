'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var logSchema = new Schema ({
  Entry: Date, //Enter date
  User: {
    Name: String,
    Age:  Number,
    Gender: String,
    Condition: String
  },
  Car: {
    Plates: String,
    Brand: String,
    Year: Number
  }
});

module.exports = mongoose.model('Log', logSchema);
