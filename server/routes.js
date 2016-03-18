/**
* Main app routes
*/
'use strict';

var express    = require('express');
var Zone = require('./api/zones/parkZone.controller');
var Car  = require('./api/cars/car.controller');
var User  = require('./api/users/user.controller');
var Log  = require('./api/logs/log.controller');

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
      console.log('post', req.body);
      if(req.body.Name){
        Zone.create(req, res);
      }
    });
  router.route('/zones/:id')
    .delete(function(req, res){
      Zone.destroy(req, res);
    });
  router.route('/zones/:id')
    .patch(function(req, res){
      Zone.update(req, res);
    });
  router.route('/zones/priority/:zone')
    .get(function(req, res){
      Zone.getPriority(req, res);
    });
  //Car
  router.route('/cars')
    .get(function(req, res){
      Car.index(req, res);
    });
  router.route('/cars')
    .post(function(req, res){
      Car.create(req, res);
    });
  router.route('/cars/:id')
    .delete(function(req, res){
      Car.destroy(req, res);
    });
  router.route('/cars/user/:Email')
    .get(function(req, res){
      Car.byEmail(req, res);
    });
  //Users
  router.route('/users')
    .get(function(req, res){
      User.index(req, res);
    });
  router.route('/users/verify')
    .post(function(req, res){
      User.verify(req, res);
  });
  router.route('/users')
    .post(function(req, res){
      User.create(req, res);
    });
  router.route('/users/:Email')
    .patch(function(req, res){
      User.addCar(req, res);
    });
  router.route('/users/:id')
    .delete(function(req, res){
      User.destroy(req, res);
    });
  //log
  router.route('/logs')
  .get(function(req, res){
      Log.index(req, res);
  });
  router.route('/logs/:day/:month/:year')
  .get(function(req, res){
      Log.indexDate(req, res);
  });
  router.route('/logs/:day/:month/:year/to/:day2/:month2/:year2')
  .get(function(req, res){
      Log.indexDateRange(req, res);
  });
  router.route('/logs')
  .post(function(req, res){
      Log.create(req, res);
  });
  app.use('/api', router);
};
