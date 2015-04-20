var map;
var pos;

$(document).on('pageshow','#map-page', function(){
    $('#map-page').css('height', '100%');
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos); 
}); 

$(document).on('pagecreate','#map-page', function() {
    map = initialize();
    myPosition();
});
                  
function initialize (){
    var mapOptions = {
        zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        
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
    