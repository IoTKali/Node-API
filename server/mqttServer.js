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

function setup() {
  console.log('Mosca server is up and running')
}
module.exports = server;
