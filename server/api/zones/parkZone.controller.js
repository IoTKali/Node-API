'use strict';

var _ = require('lodash');
var Zone = require('./parkZone.model');

// Get list of zones
exports.index = function(req, res) {
  Zone.find(function (err, zones) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(zones);
  });
};

// Get a single zone
exports.show = function(req, res) {
  Zone.findById(req.params.id, function (err, zone) {
    if(err) { return handleError(res, err); }
    if(!zone) { return res.status(404).send('Not Found'); }
    return res.json(zone);
  });
};

// Creates a new zone in the DB.
exports.create = function(req, res) {
  Zone.create(req.body, function(err, zone) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(zone);
  });
};

// Updates an existing zone in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Zone.findById(req.params.id, function (err, zone) {
    if (err) { return handleError(res, err); }
    if(!zone) { return res.status(404).send('Not Found'); }

    _.extend(zone, req.body);
    zone.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(zone);
    });
  });
};

// Deletes a zone from the DB.
exports.destroy = function(req, res) {
  Zone.findById(req.params.id, function (err, zone) {
    if(err) { return handleError(res, err); }
    if(!zone) { return res.status(404).send('Not Found'); }
    zone.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
