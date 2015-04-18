
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
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('3');
        //app.receivedEvent('deviceready');
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");

        // check if the current device is able to launch augmented reality experiences
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported);
        if(navigator.geolocation){
            var parentElement = document.getElementById('deviceready');
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            //navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        }
        else
            alert("va a ser que no");

        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");

        // check if the current device is able to launch augmented reality experiences
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported);
    },
    onDeviceNotSupported: function({
        alert("Not supported");
    },
    onDeviceSupported: function() {
        alert('4');
        // ... code that is executed if the device is supported ...
        //app.wikitudePlugin._onARchitectWorldLaunchedCallback = app.onARchitectWorldLaunched;
        //app.wikitudePlugin._onARchitectWorldFailedLaunchingCallback = app.onARchitectWorldFailedLaunching;

        app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);

        app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                    /* Respond to successful world loading if you need to */ 
                }, function errorFn(error) {
                    alert('Loading AR web view failed: ' + error);
                },
                example.path, example.requiredFeatures, example.startupConfiguration
            );
    },
    onSuccess: function(position){
        window.location.href ="camPage.html";
    },
    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
    onURLInvoked: function(url) {
        alert('Wikitude AR => PhoneGap ' + url);
    } 
};
