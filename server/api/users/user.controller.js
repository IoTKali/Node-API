'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of Users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    return res.json(user);
  });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }

    _.extend(user, req.body);
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
//add car to users
exports.addCar = function(req, res){
  User.findOne({ Email: req.params.Email}, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    if(!req.body.Plates)return res.status(200).json(user);
    console.log(req.body.Plates);
    user.Plates.push(req.body.Plates);
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
//verify
exports.verify = function (req, res){
  if (!req.body.Email && !req.body.Password){return res.status(204).send('No Content');}
  User.findOne({ Email: req.body.Email }, function(err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    if(user.Password === req.body.Password){
      return res.status(200).json(user);
    }
    else {
      return res.status(204).send('No Content');
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
