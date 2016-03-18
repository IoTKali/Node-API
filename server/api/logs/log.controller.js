'use strict';

var _ = require('lodash');
var Log = require('./log.model');

// Get list of Logs
exports.index = function(req, res) {
  Log.find(function (err, logs) {
    if(err) { return handleError(res, err); }
    return res.status(200).jsonp(logs);
  });
};

// Get a single log
exports.show = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    return res.jsonp(log);
  });
};

// Creates a new log in the DB.
exports.create = function(req, res) {
  Log.create(req.body, function(err, log) {
    if(err) { return handleError(res, err); }
    return res.status(201).jsonp(log);
  });
};

// Updates an existing log in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }

    _.extend(log, req.body);
    log.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).jsonp(log);
    });
  });
};

// Deletes a log from the DB.
exports.destroy = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.status(404).send('Not Found'); }
    log.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get logs from a specific Date
exports.indexDate = function(req, res){
  //"2016-03-16T21:52:53.392Z"
  var dateStr = req.params.year+'-'+req.params.month+'-'+req.params.day;
  Log.find({
    Entry: {
      '$gte': new Date(dateStr + 'T00:00:00.000Z'),
      '$lt':  new Date(dateStr + 'T23:59:59.999Z')
    }
  },function (err, logs){
    return res.status(200).jsonp(logs);
  });
};
// Get logs from a specific Date range
exports.indexDateRange = function(req, res){
  //"2016-03-16T21:52:53.392Z"
  var dateStr = req.params.year +'-'+req.params.month +'-'+req.params.day;
  var dateStr2= req.params.year2+'-'+req.params.month2+'-'+req.params.day2;
  Log.find({
    Entry: {
      '$gte': new Date(dateStr + 'T00:00:00.000Z'),
      '$lt':  new Date(dateStr2 + 'T23:59:59.999Z')
    }
  },function (err, logs){
    return res.status(200).jsonp(logs);
  });
};
function handleError(res, err) {
  return res.status(500).send(err);
}
