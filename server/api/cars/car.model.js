'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var carSchema = new Schema ({
  Plates: String,
  Brand: String,
  Model: String,
  Year: Number
});

module.exports = mongoose.model('Car', carSchema);
