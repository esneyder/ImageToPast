var localizaciones = [];
var id;
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

$(document).on('pageshow','#detail-page', function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(pos);
    $('#info-imagen').attr("src", localizaciones[id].poiData.image);
    $('#info-nombre').html(localizaciones[id].poiData.title);
    $('#info-distancia').html((localizaciones[id].distanceToUser > 999) ? ((localizaciones[id].distanceToUser / 1000).toFixed(2) + " km") : (Math.round(localizaciones[id].distanceToUser) + " m"));
    $('#info-descripcion').html(localizaciones[id].poiData.description);
}); 
