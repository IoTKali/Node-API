'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var userSchema = new Schema ({
  Name: String,
  Birthdate: Date,
  Email: { type: String, required: true, index: { unique: true } },
  Password: { type: String, required: true },
  Gender: { type: String, enum: ['male','female']},
  Condition: { type: String, enum: ['handicaped','pregnant','none']},
  Plates: [String]
});

module.exports = mongoose.model('User', userSchema);
