// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'app_id': '8NJV9SYk49xlyH96lakn',

  'app_code': 'CVUT0gQjRT5Z4S1aPAAfFg'
});

// Retrieve the target element for the map:
var targetElement = document.getElementById('mapContainer');
// Get default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
// Instantiate the map:
var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.normal.map,
  {
  zoom: 13,
  center: { lat: -23.5505, lng: -46.6333 }
  });
// Create the parameters for the geocoding request:
var geocodingParams = {
    searchText: 'Rua Bela Cintra, 85, Consolação, São Paulo - SP'
  };
// Define a callback function to process the geocoding response:
var onResult = function(result) {
  var locations = result.Response.View[0].Result,
    position,
    marker;
  // Add a marker for each location found
  for (i = 0;  i < locations.length; i++) {
  position = {
    lat: locations[i].Location.DisplayPosition.Latitude,
    lng: locations[i].Location.DisplayPosition.Longitude
  };
  marker = new H.map.Marker(position);
  map.addObject(marker);
  }
};

// Get an instance of the geocoding service:
var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):

geocoder.geocode(geocodingParams, onResult, function(e) {
  alert(e);
});

var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
$(document).ready(function(){ // jquery
database.ref("users/" + USER_ID).once("value")
    .then(function (snapshot) {
      var userInfo = snapshot.val();
      var userAdress = userInfo.adress; 
      console.log(userAdress);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });


// funcao clima  
fetch("https://api.openweathermap.org/data/2.5/weather?q=bahia,br&mode=json&APPID=a9d6e04c9d61e00669defb70b6cefd7e&units=metric")
.then(response => response.json())
.then(data => {
  console.log(data);
createAll(data)
});// deve-se chamar a funcao aqui dentro para funcionar


});

function createAll(data){// é dentro dessa funcao que vamos trbalhar as coisas
  console.log(data.main)

  var temp = data.main.temp;
  var min = data.main.temp_min;
  var max = data.main.temp_max; 

  $("#root").append(`
<h1>${temp}°C atual</h1>
<h1>${min}°C min</h1>
<h1>${max}°C max</h1>
    `)
}// fim funcao clima