var map;
var pos;

$( "a" ).on( "click", function( event ){
    console.log("hola ");

});

$(document).on('pageshow','#map-page', function(){
    $('#map-page').css('height', '100%');
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos); 
}); 

$(document).on('pagecreate','#map-page', function() {
    map = initialize();
    myPosition();
});

$(document).on('pageshow','#detail-page', function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos); 
}); 

$(document).on('pagecreate','#detail-page', function() {
    map = initialize();
    myPosition();
});

$(document).on('pagecreate','#list-page', function() {
    var localizaciones = [];
    for ( i = 0; i < World.markerList.length; i++){
        var distancia = (World.markerList[i].distanceToUser > 999) ? ((World.markerList[i].distanceToUser / 1000).toFixed(2) + " km") : (Math.round(World.markerList[i].distanceToUser) + " m")
        var localizacion = {
                            "nombre":World.markerList[i].poiData.title,
                            "imagen":World.markerList[i].poiData.image,
                            "distancia":distancia
                            };
        localizaciones.push(localizacion);
    }
    
    localizaciones.sort(function(a, b){return a.distancia-b.distancia});
    var lista = "";
    localizaciones.forEach(function(element, index, array){
        lista = lista + "<li class='collection-item avatar materialize_esp'>\
          <img src='"+element.imagen+"'' alt='' class='circle'>\
          <span class='title'>"+element.nombre+"</span>\
          <p> <br>\
             "+element.distancia+"\
          </p>\
          <a href='#detail-page' id='"+element.nombre+"' class='secondary-content'><i class='mdi-action-info-outline brown lighten-1'></i></a>\
        </li>";
    });
    $( "#listado").html(lista);
});
                  
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
    