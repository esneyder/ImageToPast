var map;

function initialize() {
    console.log('CURRO: Dentro de initialize');
  var mapOptions = {
    zoom: 16
  };
  console.log('CURRO: antes de nada');
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
 console.log('CURRO: tras google.maps.Map');
  if(navigator.geolocation) {
        console.log('CURRO: entra en el if');
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
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
    console.log('CURRO: Antes del resize');
      $(window).resize(function(){
        resize_map();
      });       
    console.log('CURRO: tras el resize');
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
function resize_map() {
    $('#map-canvas').height($(window).height() - $('#cerrar').height());
    google.maps.event.trigger(map, 'resize')
}
$(document).on('pageshow','#map-page', function(){
            initialize();
            console.log('CURRO: TRAS INICILIZAR EL MAPA');
            resize_map();
        }); 