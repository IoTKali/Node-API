'use strict';

//development specific enviroment configurations

module.exports = {
  mongoDB: {
    uri: 'mongodb://localhost/kali-park'
  },
  mosca: {
    port: 1883,
    persistence: {
      uri: 'mongodb://localhost:27017/mqtt'
    }
  }
};
