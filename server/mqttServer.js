var config   = require ('./config/enviroment');
var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: config.mosca.persistence.uri,
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: config.mosca.persistence.port,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: config.mosca.persistence.uri
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
//mqtt config for app
var ZoneModel = require('./api/zones/parkZone.model');
var LogModel  = require('./api/logs/log.model');
var CarModel  = require('./api/cars/car.model');
var UserModel = require('./api/users/user.model');
var _ = require('lodash');
server.on('published', function(packet, client) {
  if (client){
    console.log('Topic:', packet.topic);
    console.log('Published:', packet.payload.toString());
    //check for entry
    var entryRgx = /^entry\//;
    if(entryRgx.test(packet.topic)){
      var zone = packet.topic.replace(entryRgx, '');
      var plates = packet.payload.toString();
      console.log('Entry:',zone);
      console.log('Plates:',plates);
      return;
    }


    var fromZone = packet.payload.toString();
    var toZone   = packet.topic;
    //Update car count
    ZoneModel.findOne({ Name: fromZone}, function (err, zone){
      if(err) { console.log('Error', err); return;}
      if(!zone){console.log('Invalid Zone',fromZone); return;}
      zone.Cars--;
      zone.save(function (err) {
        if (err) { console.log('Error', err); return; }
        console.log('Updated', zone.Name);
      });
    });
    ZoneModel.findOne({ Name: toZone}, function (err, zone){
      if(err) { console.log('Error', err); return;}
      if(!zone){console.log('Invalid Zone',toZone); return;}
      zone.Cars++;
      zone.save(function (err) {
        if (err) { console.log('Error', err); return; }
        console.log('Updated', zone.Name);
      });
    });
  }


});


function setup() {
  console.log('Mosca server is up and running')
}


module.exports = server;
