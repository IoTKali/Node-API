'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var userSchema = new Schema ({
  Name: String,
  Age: { type: Number, min: 16 },
  Gender: { type: String, enum: ['male','female']},
  Condition: { type: String, enum: ['handicaped','pregnant','none']},
  Plates: [String]
});

module.exports = mongoose.model('User', userSchema);
