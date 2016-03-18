'use strict';

var _ = require('lodash');
var Car = require('./car.model');
var UserModel = require('../users/user.model');
// Get list of Cars
exports.index = function(req, res) {
  Car.find(function (err, cars) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(cars);
  });
};

// Get a single car
exports.show = function(req, res) {
  Car.findById(req.params.id, function (err, car) {
    if(err) { return handleError(res, err); }
    if(!car) { return res.status(404).send('Not Found'); }
    return res.json(car);
  });
};

// Creates a new car in the DB.
exports.create = function(req, res) {
  Car.create(req.body, function(err, car) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(car);
  });
};

// Updates an existing car in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Car.findById(req.params.id, function (err, car) {
    if (err) { return handleError(res, err); }
    if(!car) { return res.status(404).send('Not Found'); }

    _.extend(car, req.body);
    car.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(car);
    });
  });
};

// Deletes a car from the DB.
exports.destroy = function(req, res) {
  Car.findById(req.params.id, function (err, car) {
    if(err) { return handleError(res, err); }
    if(!car) { return res.status(404).send('Not Found'); }
    car.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
//get cars by user Email
exports.byEmail = function(req, res){
  UserModel.findOne({Email: req.params.Email}, function(err,user){
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    Car.find({Plates: { $in: user.Plates }}, function (err, cars) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(cars);
    });
  });
}
function handleError(res, err) {
  return res.status(500).send(err);
}
