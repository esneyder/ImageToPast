var example = {
    "path": "www/world/4_PointOfInterest_3_MultiplePois/index.html", 
    "requiredFeatures": [
        "geo"
    ], 
    "startupConfiguration": {
        "camera_position": "back"
    }
};
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
        
        // check if the current device is able to launch ARchitect Worlds
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.isDeviceSupported(function() {
                app.isDeviceSupported = true;
                app.loadARchitectWorld(example);
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
    loadARchitectWorld: function(example) {
        app.wikitudePlugin.setOnUrlInvokeCallback(app.onUrlInvoke);

        if (app.isDeviceSupported) {
            app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                    /* Respond to successful world loading if you need to */ 
                }, function errorFn(error) {
                    alert('Loading AR web view failed: ' + error);
                },
                example.path, example.requiredFeatures, example.startupConfiguration
            );

            // inject poi data using phonegap's GeoLocation API and inject data using World.loadPoisFromJsonData
            if ( example.requiredExtension === "ObtainPoiDataFromApplicationModel" ) {
                navigator.geolocation.getCurrentPosition(onLocationUpdated, onLocationError);
            }
        } else {
            alert("Device is not supported");
        }
    },
    onUrlInvoke: function (url) {
        if (url.indexOf('captureScreen') > -1) {
            app.wikitudePlugin.captureScreen(
                function(absoluteFilePath) {
                    alert("snapshot stored at:\n" + absoluteFilePath);
                }, 
                function (errorMessage) {
                    alert(errorMessage);                
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
    }
    // --- End Wikitude Plugin ---
};

