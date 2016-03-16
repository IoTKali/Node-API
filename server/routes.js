/**
* Main app routes
*/
'use strict';

var express    = require('express');
var Zone = require('./api/zones/parkZone.controller');
var Car  = require('./api/cars/car.controller');
var User  = require('./api/users/user.controller');

module.exports = function(app){
  //Routes for the API
  var router = express.Router();

  router.use(function(req, res, next) {
    next();
  });

  //general routes
  router.get('/', function(req,res){
    res.json({
      owner: 'Kali IoT',
      description: 'API for parking IoT data.'
    });
  });

  //API routes
  //Zones
  router.route('/zones')
    .get(function(req, res){
      Zone.index(req, res);
    });
  router.route('/zones')
    .post(function(req, res){
      Zone.create(req, res);
    });
  router.route('/zones/:id')
    .delete(function(req, res){
      Zone.destroy(req, res);
    });

  //Car
  router.route('/cars')
    .get(function(req, res){
      Zone.index(req, res);
    });
  router.route('/cars')
    .post(function(req, res){
      Zone.create(req, res);
    });
  router.route('/cars/:id')
    .delete(function(req, res){
      Zone.destroy(req, res);
    });
  //Users
  router.route('/users')
    .get(function(req, res){
      Zone.index(req, res);
    });
  router.route('/users')
    .post(function(req, res){
      Zone.create(req, res);
    });
  router.route('/users/:id')
    .delete(function(req, res){
      Zone.destroy(req, res);
    });

  app.use('/api', router);
};
