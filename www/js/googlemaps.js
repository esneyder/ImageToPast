var map;
var pos;

$(document).on('pageshow','#map-page', function(){
    console.log("CURRO: INICIO PAGESHOW");
    $('#map-page').css('height', '100%');
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos); 
}); 

$(document).on('pagecreate','#map-page', function() {
    console.log("CURRO: INICIO INITIALIZE");
    map = initialize();
    console.log("CURRO: INITIALIZE");
    myPosition();
});
                  
function initialize (){
    console.log("CURRO: INICIO PAGECREATE");
    var mapOptions = {
        zoom:16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log("CURRO: ANTES DE MAP");
    map = new google.maps.Map(
		                  document.getElementById("map-canvas"), 
						  mapOptions);
    console.log("CURRO: TRAS MAP");    
    return map;
}
    
function onError(error){
    console.log('Error: '+error.message);
}

function myPosition (){
    console.log("CURRO: EN MYPOSITION");
    if(navigator.geolocation) {
        console.log("CURRO: DENTRO DEL IF");
        navigator.geolocation.getCurrentPosition(
            function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
                console.log("CURRO: location: "+position.coords.latitude+","+position.coords.longitude);
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
    