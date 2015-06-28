var localizaciones = [];
var posiciones = [];
var markers = [];
var id;
var map;
var map2;
var pos;
var web;
/****************** map-page ***********************/
function generaMapa(lat,lon){
    var LatLang = new google.maps.LatLng(World.userLocation.latitude, World.userLocation.longitude);
    var myOptions = {
        zoom: 12,
        center: LatLang,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
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
    localizaciones = World.markerList;
    localizaciones.forEach(function(element, index, array){
        var contentString = '<div id="info">'+
                                '<p>'+element.poiData.title+'</p>'+
                            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });                       
        var posicionPoi = new google.maps.LatLng(element.poiData.latitude, element.poiData.longitude);
        var marker = new google.maps.Marker({
            position: posicionPoi,
            icon: 'img/marker.png',
            map: map,
            title: element.poiData.title,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
    
    });

}
$(document).on('pageshow','#map-page', function(){
    generaMapa(); 
});
/****************** detail-page ***********************/
function generaMapaMini(){
    var LatLang = new google.maps.LatLng(localizaciones[id].poiData.latitude, localizaciones[id].poiData.longitude);
    var myOptions = {
        zoom: 20,
        center: LatLang,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map2 = new google.maps.Map(document.getElementById("map-canvas2"), myOptions);
        // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: LatLang,
        map: map2,
        icon: 'img/marker.png',
        title: localizaciones[id].poiData.title
    });
}
function enviarPagina(web){
    document.location = 'architectsdk://action=openPage?p='+web;
}
$(document).on('pageshow','#detail-page', function(){
    generaMapaMini(); 
    $('#info-imagen').attr("src", localizaciones[id].poiData.image);
    $('#info-nombre').html(localizaciones[id].poiData.title);
    $('#info-distancia').html((localizaciones[id].distanceToUser > 999) ? ((localizaciones[id].distanceToUser / 1000).toFixed(2) + " km") : (Math.round(localizaciones[id].distanceToUser) + " m"));
    $('#info-descripcion').html(localizaciones[id].poiData.description);
    $('#location-link').attr("onClick","enviarPagina('http://maps.google.com/maps?saddr="+World.userLocation.latitude+","+World.userLocation.longitude+"&daddr="+localizaciones[id].poiData.latitude+","+localizaciones[id].poiData.longitude+"&directionsmode=walking&zoom=17');");
    var web = localizaciones[id].poiData.web;
    $('#info-link').attr("onClick","enviarPagina('"+web+"');");
});

/****************** list-page ***********************/
$(document).on('pageshow','#list-page', function() {
    localizaciones = World.markerList.sort(World.sortByDistanceSorting);
    var lista = "";
    localizaciones.forEach(function(element, index, array){
        var distancia = (element.distanceToUser > 999) ? ((element.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(element.distanceToUser) + " m")
        lista = lista + "<li class='collection-item avatar materialize_esp'>\
          <img src='"+element.poiData.image+"' alt='' class='circle'>\
          <span class='title'>"+element.poiData.title.trunc(24)+"</span>\
          <p> <br>\
             "+distancia+"\
          </p>\
          <a href='#detail-page' id='"+index+"' class='secondary-content' data-transition='slide'><i class='mdi-action-info-outline itp-list-link'></i></a>\
        </li>";
    });
    $( "#listado").html(lista);
    $("a").on("click", function(e){
        id = $(this).attr("id");
    });
});


