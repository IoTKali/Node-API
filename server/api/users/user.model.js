'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var userSchema = new Schema ({
  Name: String,
  Age: Number,
  Condition: String,
  Plates: [String]
});

module.exports = mongoose.model('User', userSchema);
