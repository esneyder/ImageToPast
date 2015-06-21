var myWorld = {
    "path": "www/world.html", 
    "requiredFeatures": [
        "geo"
    ], 
    "startupConfiguration": {
        "camera_position": "back"
    }
};
var ala;
var app = {

    // represents the device capability of launching ARchitect Worlds with specific features
    isDeviceSupported: false,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
         
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
        // check if the current device is able to launch ARchitect Worlds
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.isDeviceSupported(function() {
                app.isDeviceSupported = true;
                app.loadARchitectWorld(myWorld);
            }, function(errorMessage) {
                app.isDeviceSupported = false;    
                alert('Unable to launch ARchitect Worlds on this device: \n' + errorMessage);            
            },
            [app.wikitudePlugin.FeatureGeo, app.wikitudePlugin.Feature2DTracking]
        );
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // --- Wikitude Plugin ---
    // Use this method to load a specific ARchitect World from either the local file system or a remote server
    loadARchitectWorld: function(myWorld) {
        app.wikitudePlugin.setOnUrlInvokeCallback(app.onUrlInvoke);

        if (app.isDeviceSupported) {
            app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                    /* Respond to successful world loading if you need to */ 
                }, function errorFn(error) {
                    alert('Loading AR web view failed: ' + error);
                },
                myWorld.path, myWorld.requiredFeatures, myWorld.startupConfiguration
            );
        } else {
            alert("Device is not supported");
        }
    },
    onUrlInvoke: function (url) {
        if ( 'openPage' == url.substring(22) ) {
            console.log(pagina);
            console.log($pagina);
            window.open(pagina,'system','location=no');
            
        } else
          alert(url + "not handled");
    },

    locationChanged: function locationChangedFn(lat, lon, alt, acc) {
        alert("lat: "+lat+", long: "+lon );
    }
    // --- End Wikitude Plugin ---
};

AR.context.onLocationChanged = World.locationChanged;


