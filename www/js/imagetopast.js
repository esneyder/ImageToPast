var localizaciones = [];
var id;
var map;
var pos;
/****************** map-page ***********************/
function googleMapsFull()
{
     document.location = 'architectsdk://action=googleMapsFull';
}
function generaMapa(lat,lon){
    alert(lat);
    alert(lon);
    var LatLang = new google.maps.LatLng(lat, lon);
    var myOptions = {
        zoom: 10,
        center: LatLang,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: LatLang,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            fillColor: '#00F',
            fillOpacity: 1
        },
        map: map,
        title: "Greetings!"
    });

}
$(document).on('pageshow','#map-page', function(){
    googleMapsFull(); 
});
/*$(document).on('pageshow','#map-page', function(){
    $('#map-page').css('height', '100%');
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos); 
}); 

$(document).on('pagecreate','#map-page', function() {
    map = initialize();
    myPosition();
});
/****************** detail-page ***********************/
function googleMapsMini()
{
     document.location = 'architectsdk://action=googleMapsMini';
}
function generaMapaMini(lat,lon){
    alert(lat);
    alert(lon);
    var LatLang = new google.maps.LatLng(lat, lon);
    var myOptions = {
        zoom: 10,
        center: LatLang,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas2"), myOptions);
        // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: LatLang,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            fillColor: '#00F',
            fillOpacity: 1
        },
        map: map,
        title: "Greetings!"
    });

}
$(document).on('pageshow','#detail-page', function(){
    googleMapsMini(); 
    $('#info-imagen').attr("src", localizaciones[id].poiData.image);
    $('#info-nombre').html(localizaciones[id].poiData.title);
    $('#info-distancia').html((localizaciones[id].distanceToUser > 999) ? ((localizaciones[id].distanceToUser / 1000).toFixed(2) + " km") : (Math.round(localizaciones[id].distanceToUser) + " m"));
    $('#info-descripcion').html(localizaciones[id].poiData.description);
});
/****************** list-page ***********************/
$(document).on('pagecreate','#list-page', function() {
    localizaciones = World.markerList;
    localizaciones.sortByDistanceSorting;
    var lista = "";
    localizaciones.forEach(function(element, index, array){
        var distancia = (element.distanceToUser > 999) ? ((element.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(element.distanceToUser) + " m")
        lista = lista + "<li class='collection-item avatar materialize_esp'>\
          <img src='"+element.poiData.image+"' alt='' class='circle'>\
          <span class='title'>"+element.poiData.title+"</span>\
          <p> <br>\
             "+distancia+"\
          </p>\
          <a href='#detail-page' id='"+index+"' class='secondary-content'><i class='mdi-action-info-outline itp-list-link'></i></a>\
        </li>";
    });
    $( "#listado").html(lista);
    $("a").on("click", function(e){
        console.log("pulsado");
        id = $(this).attr("id");
    });
});


