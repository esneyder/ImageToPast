
var map;
var pos;

function initialize (){
  var mapOptions = {
    zoom:16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(
    document.getElementById("map-canvas"), 
    mapOptions);
  map = new google.maps.Map(
    document.getElementById("map-canvas2"), 
    mapOptions);
  
  return map;
}

function onError(error){
  console.log('Error: '+error.message);
}

function myPosition (){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        pos = new google.maps.LatLng(position.coords.latitude,
         position.coords.longitude);
        var marker = new google.maps.Marker({
          position: pos,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            fillColor: '#00F',
            fillOpacity: 1
          },
          map: map
        });
        map.setCenter(pos);               
      },
      onError,
      {enableHighAccuracy:true,
       timeout: 6000,   
       maximumAge: 500000}
       );
    
  } 
}

function myMap(){
  initialize();
  myPosition();
}
