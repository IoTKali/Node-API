'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var parkZoneSchema = new Schema ({
  Points: [{latitude:Number, longitude: Number}],
  Name: String,
  Spots: Number,
  SpecialSpots: Number,
  Cars: Number
});

module.exports = mongoose.model('Zone', parkZoneSchema);
