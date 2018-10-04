var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
$(document).ready(function(){ // jquery
database.ref("users/" + USER_ID).once("value")
    .then(function (snapshot) {
      var userInfo = snapshot.val();
      var userAdress = userInfo.adress; 
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

    $(".search-btn").on('click', function() {
      getLocation();
      clima();
      });
});



function clima() {
// funcao clima  
fetch("https://api.openweathermap.org/data/2.5/weather?q=sao paulo,br&mode=json&APPID=a9d6e04c9d61e00669defb70b6cefd7e&units=metric")
.then(response => response.json())
.then(data => {
createAll(data)
});// deve-se chamar a funcao aqui dentro para funcionar
function createAll(data){// é dentro dessa funcao que vamos trbalhar as coisas

  var temp = data.main.temp;
  var min = data.main.temp_min;
  var max = data.main.temp_max; 

  $("#root").append(`
<h1>${temp}°C now</h1>
<h1>${min}°C min</h1>
<h1>${max}°C max</h1>
    `)
}
}


const platform = new H.service.Platform({
  'app_id': '8NJV9SYk49xlyH96lakn',
  "useHTTPS": true,
  'app_code': 'CVUT0gQjRT5Z4S1aPAAfFg'
});
const geocoder = platform.getGeocodingService();
const router = platform.getRoutingService();
function getStartGeoLocation(result) {
  const locations = result.Response.View[0].Result;

  const localStartLat = locations[0].Location.DisplayPosition.Latitude;
  const localStartLng = locations[0].Location.DisplayPosition.Longitude;

  return drawMap(localStartLat, localStartLng);
};
function getLocation() {
  const startVal = $(".startPoint").val();
  const geocodingParams = {
    searchText: startVal
  };
    return geocoder.geocode(geocodingParams, getStartGeoLocation, function (e) {
    alert(e);
  });
}
function drawMap(s, e) {
const routingParameters = {
  'mode': 'fastest;car',
  'waypoint0': s + ',' + e,
  'waypoint1': '-23.557703,-46.662336',
  'representation': 'display'
};

  const targetElement = document.getElementById('mapContainer');
  const defaultLayers = platform.createDefaultLayers();

  const map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
      zoom: 14,
      center: { lat: s, lng: e }
    }
  );

// Define a callback function to process the routing response:
const onResult = function(result) {
  let route,
    routeShape,
    startPoint,
    endPoint,
    linestring;

    if(result.response.route) {
      // Pick the first route from the response:
      route = result.response.route[0];
      // Pick the route's shape:
      routeShape = route.shape;

      // Create a linestring to use as a point source for the route line
      linestring = new H.geo.LineString();

      // Push all the points in the shape into the linestring:
      routeShape.forEach(function(point) {
        const parts = point.split(',');
        linestring.pushLatLngAlt(parts[0], parts[1]);
      });

      // Retrieve the mapped positions of the requested waypoints:
      startPoint = route.waypoint[0].mappedPosition;
      endPoint = route.waypoint[1].mappedPosition;

      // Create a polyline to display the route:
      const routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: 'blue', lineWidth: 10 }
      });

      // Create a marker for the start point:
      const startMarker = new H.map.Marker({
        lat: startPoint.latitude,
        lng: startPoint.longitude
      });

      // Create a marker for the end point:
      const endMarker = new H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
      });

      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);

      // Set the map's viewport to make the whole route visible:
      map.setViewBounds(routeLine.getBounds());
    }
  };

  router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });
}