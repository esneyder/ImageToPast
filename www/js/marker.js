function Marker(poiData) {
    /*
        For creating the marker a new object AR.GeoObject will be created at the specified geolocation. An AR.GeoObject connects one or more AR.GeoLocations with multiple AR.Drawables. The AR.Drawables can be defined for multiple targets. A target can be the camera, the radar or a direction indicator. Both the radar and direction indicators will be covered in more detail in later examples.
    */

    this.poiData = poiData;

    // create the AR.GeoLocation from the poi data
    var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);

    // create an AR.ImageDrawable for the marker in idle state
    this.markerDrawable_idle = new AR.ImageDrawable(World.markerDrawable_idle, 3, {
        zOrder: 2,
        opacity: 1.0,
        /*
            To react on user interaction, an onClick property can be set for each AR.Drawable. The property is a function which will be called each time the user taps on the drawable. The function called on each tap is returned from the following helper function defined in marker.js. The function returns a function which checks the selected state with the help of the variable isSelected and executes the appropriate function. The clicked marker is passed as an argument.
        */
        onClick: Marker.prototype.getOnClickTrigger(this)
    });

    // create an AR.ImageDrawable for the marker in selected state
    this.markerDrawable_selected = new AR.ImageDrawable(World.markerDrawable_selected, 3, {
        zOrder: 2,
        opacity: 0.0,
        onClick: null
    });

    // create an AR.Label for the marker's title 
    this.titleLabel = new AR.Label(poiData.title.trunc(10), 0.5, {
        zOrder: 2,
        offsetY: 0.55,
        style: {
            textColor: '#ededed',
            fontStyle: AR.CONST.FONT_STYLE.BOLD
        }
    });

    this.myImage = new AR.ImageResource(poiData.image);

    this.imageLabel = new AR.ImageDrawable(this.myImage, 1.7, {
        zOrder: 1,
        offsetY : 0.55,
        opacity: 0.7,
        onClick: null
    })

    // create the AR.GeoObject with the drawable objects
    this.markerObject = new AR.GeoObject(markerLocation, {
        drawables: {
            cam: [this.markerDrawable_idle, this.markerDrawable_selected, this.titleLabel, this.imageLabel]
        }
    });

    return this;
}

Marker.prototype.getOnClickTrigger = function(marker) {

    /*
        The setSelected and setDeselected functions are prototype Marker functions.

        Both functions perform the same steps but inverted, hence only one function (setSelected) is covered in detail. Three steps are necessary to select the marker. First the state will be set appropriately. Second the background drawable will be enabled and the standard background disabled. This is done by setting the opacity property to 1.0 for the visible state and to 0.0 for an invisible state. Third the onClick function is set only for the background drawable of the selected marker.
    */

    return function() {

        if (marker.isSelected) {

            Marker.prototype.setDeselected(marker);

        } else {
            Marker.prototype.setSelected(marker);
            try {
                World.onMarkerSelected(marker);
            } catch (err) {
                alert(err);
            }

        }

        return true;
    };
};

Marker.prototype.setSelected = function(marker) {

    marker.isSelected = true;

    marker.markerDrawable_idle.opacity = 0.0;
    marker.markerDrawable_selected.opacity = 1.0;
    marker.markerDrawable_idle.onClick = null;
    marker.markerDrawable_selected.onClick = Marker.prototype.getOnClickTrigger(marker);
    
    // NOS DA LA DISTANCIA ENTRE NUESTRA POSICION Y EL MARKER
    marker.distanceToUser = marker.markerObject.locations[0].distanceToUser();    
    // MOSTRAMOS UN DIV CON MÁS INFORMACION
    document.getElementById("detail-viewer").style.bottom = "5px";
    document.getElementById("name").innerHTML = marker.poiData.title;
    document.getElementById("description").innerHTML = marker.poiData.description;
    document.getElementById("distance").innerHTML = (marker.distanceToUser > 999) ? ((marker.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(marker.distanceToUser) + " m");
    var numImages = parseInt(marker.poiData.numimages);
    var carrusel = "";
    for (i=1; i<=numImages; i++) {
        carrusel = carrusel+"<li> <img style='height:200px;' src='"+marker.poiData.images+"/"+marker.poiData.id+i+".jpg'></li>";
        
    }
    document.getElementById("miSlides").innerHTML = carrusel;
    $('.slider').slider();
    
    
};

Marker.prototype.setDeselected = function(marker) {

    marker.isSelected = false;

    marker.markerDrawable_idle.opacity = 1.0;
    marker.markerDrawable_selected.opacity = 0.0;

    marker.markerDrawable_idle.onClick = Marker.prototype.getOnClickTrigger(marker);
    marker.markerDrawable_selected.onClick = null;
    
    // OCULTAMOS EL DIV INFORMATIVO
    document.getElementById("detail-viewer").style.bottom = "-1000px";
    
};

// will truncate all strings longer than given max-length "n". e.g. "foobar".trunc(3) -> "foo..."
String.prototype.trunc = function(n) {
    return this.substr(0, n - 1) + (this.length > n ? '...' : '');
};