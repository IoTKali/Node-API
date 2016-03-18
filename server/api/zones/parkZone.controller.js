'use strict';

var _ = require('lodash');
var utils = require('../../utils');
var Zone = require('./parkZone.model');

// Get list of zones
exports.index = function(req, res) {
  Zone.find(function (err, zones) {
    if(err) { return handleError(res, err); }
    return res.status(200).jsonp(zones);
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
  if(!req.body.Center){ //Center not provided, calculate
    req.body.Center = utils.getLatLngCenter(req.body.Points);
  }
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
    console.log(zone);
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
//Get Zones ordered by priority, according to
exports.getPriority = function (req, res){
  var target = req.params.zone;
  //Create zone dictionary
  var ZoneDictionary = {};
  Zone.find(function (err, zones) {
    if(err) { return handleError(res, err); }
    zones.forEach(function (zone){
      ZoneDictionary[zone.Name] = zone;
    });
    var distances = utils.Dijkstra(ZoneDictionary, target);
    var distArray = [];
    for (var zone in distances) {
      if (distances.hasOwnProperty(zone)) {
        distArray.push({name: zone, dist: distances[zone]});
      }
    }
    distArray.sort(function(a, b) {
      return a.dist - b.dist;
    });
    var resultArray = [];
    var rejected = [];
    distArray.forEach(function(elem){
      var disponibility = ZoneDictionary[elem.name].Spots
                        - ZoneDictionary[elem.name].Cars;
      if(disponibility > 0){
        resultArray.push(ZoneDictionary[elem.name]);
      }
      else{
        rejected.push(ZoneDictionary[elem.name]);
      }
    });
    rejected.forEach(function(elem){
      resultArray.push(elem);
    });
    return res.status(200).json(resultArray);
  });
}
function handleError(res, err) {
  return res.status(500).send(err);
}
