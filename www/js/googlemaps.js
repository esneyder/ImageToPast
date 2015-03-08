
 $
            var map,
                id,
                currentPosition,
                mapCenter = new google.maps.LatLng(39.473263, -0.383927);
            function initialize() {
                alert("entro");
                intitilizeMap();
                if(navigator.geolocation) {
                    id = navigator.geolocation.getCurrentPosition ( displayAndWatchMap, locationError );
                }else{
                    alert("Se ha producido un error");
                }
            }
            
            // Inicilizamos el mapa
            function intitilizeMap(){ 
                alert("aqui llego?")
                 var mapOptions = {
                    zoom: 16,
                    center: mapCenter,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('map-canvas'),
                                          mapOptions);
                
                alert("aqui llego2?")
            }
            
            // En caso de error al obtener la posicion mostramos un mensaje
            function locationError(){ 
                alert("Imposible obtener la localización");
            }
            
            // Establecemos la posición actual en el mapa
            function setPositionInGoogleMap(position){ 
                var mapPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
               

                currentPosition = new google.maps.Marker({
                    position: mapPos,
                    map: map,
                    title: "Posición actual"
                });
                
                map.panTo(mapPos)
            }
            
            // Obtenemos la posicion actual
            function getCurrentPosition(){
                id = navigator.geolocation.watchPosition (
                    function (position){
                        setMarker(currentPosition, position);
                    });
            }
            
            function setMarker (marker, position){
                var mapPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(mapPos);
            }
            
            function displayAndWatchMap(position){
                setPositionInGoogleMap(position);
                getCurrentPosition();
            }
            //google.maps.event.addDomListener(window, 'load', initialize);
            