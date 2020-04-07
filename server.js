// 'use strict';

// // Load Environment Variables from the .env file
// require('dotenv').config();

// // Application Dependencies
// const express = require('express');

// // Application Setup
// const PORT = process.env.PORT;
// const app = express();

// app.get('/', (request, response) => {
//   response.send('city explorer goes here');
// });

// // Make sure the server is listening for requests
// app.listen(PORT, () => console.log(`App is listening on ${PORT}`));





'use strict';

// Load Environment Variables from the .env file
const dotenv = require('dotenv');
dotenv.config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors()); // Middleware



app.get('/weather', weatherHandler) ;
function weatherHandler(request, response) {
  const darksky = require('./data/darksky.json');
  const weather = request.query.weather;
  const weatherResponse= new Weather(weather, darksky);
  response.send(weatherResponse);
}

// Add /location route
app.get('/location', locationHandler);

// Route Handler
function locationHandler(request, response) {
  const geoData = require('./data/geo.json');
  const city = request.query.city;
  const location = new Location(city, geoData);
  response.send(location);
}

// Has to happen after everything else
app.use(notFoundHandler);
// Has to happen after the error might have occurred
app.use(errorHandler); // Error Middleware

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

// Helper Functions

function errorHandler(error, request, response, next) {
  console.log(error);
  response.status(500).json({
    error: true,
    message: error.message,
  });
}

function notFoundHandler(request, response) {
  response.status(404).json({
    notFound: true,
  });
}

function Location(city, geoData) {
  this.search_query = city; // 
  this.formatted_query = geoData[0].display_name; 
  this.latitude = parseFloat(geoData[0].lat);
  this.longitude = parseFloat(geoData[0].lon);
}

function  Weather( weather,darksky){
  this.search_query = city; // 
  this.formatted_query = geoData[0].display_name; 
  this.latitude = parseFloat(geoData[0].lat);
  this.longitude = parseFloat(geoData[0].lon);
}
