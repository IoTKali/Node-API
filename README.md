# Node-API
## Description
Server for communication with Edisons and app clients.
Holds a mongoDB database with user information and the state of the parking lot.
Communications are done through mqtt for sensor data, and http for client requests.

## Files

#### server/api/cars/car.model.js
Defines the car DB mongoose schema.
```javascript
{
  Plates: String,
  Brand: String,
  Model: String,
  Year: Number
}
```
#### server/api/cars/car.controller.js
Defines functionality for the car model.

#### server/api/logs/log.model.js
Defines the log DB mongoose schema.
```javascript
{
  Entry: Date,
  User: {
    Name: String,
    Age:  Number,
    Gender: String,
    Condition: String
  },
  Car: {
    Plates: String,
    Brand: String,
    Model: String,
    Year: Number
  }
}
```
#### server/api/logs/log.controller.js
Defines functionality for the log model.

#### server/api/users/user.model.js
Defines the log DB mongoose schema.
```javascript
{
  Name: String,
  Birthdate: Date,
  Email: String,
  Password: String,
  Gender: String,
  Condition: String,
  Plates: [String]
}
```
#### server/api/users/user.controller.js
Defines functionality for the log model.
#### server/api/zones/parkZone.model.js
Defines the log DB mongoose schema.
```javascript
{
  Points: [{latitude:Number, longitude: Number}],
  Center: { latitude:Number, longitude: Number},
  Adjacent: [String],
  Name: String,
  Spots: Number,
  SpecialSpots: Number,
  Cars: Number
}
```
#### server/api/zones/parkZone.controller.js
Defines functionality for the log model.

#### server/config/
Configuration files for the server.

#### server/seedCSV/
Files to seed the server from a csv file.

#### server/app.js
Server instantiation.
#### server/index.js
Entry file.
#### server/mqttServer.js
File for configuring mqttServer. 

#### server/routes.js
Route configuration file.
#### server/utils.js
Utility methods for geo point calculations and shortest path obtaining.

## API routes
#### http GET 'host/api/zones'
Get current state of parking log.
#### http GET 'host/api/zones/priority/:zone'
Get an ordered list of zones, ordered by fitness as a parking option.
Based on graph distance from the selected preferred zone, and spot availability.
#### http GET 'host/api/cars'
Get cars in DB.
#### http POST 'host/api/cars/'
Create a car entry on the DB.
#### http POST 'host/api/cars/user/:Email'
Get all cars belonging to a specific user.
#### http POST 'host/api/users/verify/'
Verify an Email/password pair. Gets the user info if succesful.
#### http POST 'host/api/users/'
Create a new user.
#### http PATCH 'host/api/users/'
Add car plates to a user.
#### http GET 'host/api/logs'
Get all logs from the server.
#### http GET 'host/api/logs/:day/:month/:year'
Get logs from a specific day.
#### http GET 'host/api/logs/:day/:month/:year/to/:day2/:month2/:year2'
Get logs from a specific range








