function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in
 *   degrees.
 */
exports.getLatLngCenter = function getLatLngCenter(latLngInDegr) {
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
        var lat = degr2rad(latLngInDegr[i].latitude);
        var lng = degr2rad(latLngInDegr[i].longitude);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ({latitude: rad2degr(lat), longitude: rad2degr(lng)});
}
// distance between two geographical Points
function getDistance(point, point2){
  var R = 6371000; // metres for earth radious
  var φ1 = degr2rad(point.latitude);
  var φ2 = degr2rad(point2.latitude);
  var Δφ = degr2rad((point2.latitude-point.latitude));
  var Δλ = degr2rad((point2.longitude-point.longitude));

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
function smallest(Vertices, dist){
  var min = Infinity;
  var minName = '';
  Vertices.forEach(function (zone){
    if( dist[zone] < min ){
      min = dist[zone];
      minName = zone;
    }
  });
  return minName;
}
function removeElement(array, element){
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}
exports.Dijkstra = function Dijkstra(Graph, source){
  console.log('Source:', source);
  var Q = [];
  var dist = {};
  var prev = {};
  for (var zone in Graph) {
    if (Graph.hasOwnProperty(zone)) {
        dist[zone] = Infinity;
        prev[zone] = undefined;
        Q.push(zone);
    }
  }
  dist[source] = 0;
  while(Q.length > 0){
    var u = smallest(Q, dist);
    console.log('U:',u);
    console.log(dist);
    removeElement(Q, u);
    Graph[u].Adjacent.forEach(function (v){
      var deltaDist = getDistance(Graph[u].Center, Graph[v].Center);
      console.log('delta',deltaDist);
      console.log('du', dist[u]);
      var alt = dist[u] + deltaDist;
      console.log('alt', alt);
      console.log('dv', dist[v]);
      if(alt < dist[v]){
        dist[v] = alt;
        prev[v] = u;
      }
    });
  }
  return dist;
}
