var loader = require('csv-load-sync');
var ZoneModel = require('../api/zones/parkZone.model');
var csv = loader('./server/seedCSV/OcupacionEstacionamientoIndividual.csv');
var seed = require('./seed');
var Zones ={};
csv.forEach(function(data){
  if(!Zones[data.zone]){ Zones[data.zone] = {spots : 0, taken : 0};}
  Zones[data.zone].spots++;
  Zones[data.zone].taken += parseInt(data.taken);
});
//Mock zone coordinates, cause csv format is not good enough
var DBZones = [];
var i = 0;
var total = 0;
var map = {};
for (var zone in Zones) {
  if (Zones.hasOwnProperty(zone)) {
      total++;
  }
}
for (var zone in Zones) {
  if (Zones.hasOwnProperty(zone)) {
      map[seed[i%total].Name] = zone;
      i++;
  }
}
i = 0;
for (var zone in Zones) {
  if (Zones.hasOwnProperty(zone)) {
      var cZone = seed[i%total];
      cZone.Name = map[cZone.Name];
      cZone.Adjacent.forEach(function(el, index){
        cZone.Adjacent[index] = map[el];
      });
      cZone.Spots = Zones[zone].spots;
      cZone.Cars =  Zones[zone].taken;
      DBZones.push(cZone);
      i++;
  }
}
/* Disabled, DB already populated
DBZones.forEach(function(Zone){
  ZoneModel.create(Zone,function(err, zone){
    console.console.log('Crated');
  })
});*/
console.log(DBZones);
