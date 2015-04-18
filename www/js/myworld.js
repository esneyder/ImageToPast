var example = {
    "path": "www/world/4_PointOfInterest_3_MultiplePois/index.html", 
    "requiredFeatures": [
        "geo"
    ], 
    "startupConfiguration": {
        "camera_position": "back"
    }
};
var zz = {
    initializeWorld: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('load', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        // ... some code ...

        // create a Wikitude Plugin instance
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");

        // check if the current device is able to launch augmented reality experiences
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported);
    },
    onDeviceSupported: function() {
        // ... code that is executed if the device is supported ...
        app.wikitudePlugin._onARchitectWorldLaunchedCallback = app.onARchitectWorldLaunched;
        app.wikitudePlugin._onARchitectWorldFailedLaunchingCallback = app.onARchitectWorldFailedLaunching;

        app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);

        app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                    /* Respond to successful world loading if you need to */ 
                }, function errorFn(error) {
                    alert('Loading AR web view failed: ' + error);
                },
                example.path, example.requiredFeatures, example.startupConfiguration
            );
    },
    onDeviceNotSupported: function() {
        // ... code that is executed if the device is not supported ...
    },
    onARchitectWorldLaunched: function() {

        // ... do something when the ARchitect World finished loading
    },
    onARchitectWorldFailedLaunching: function() {
        // ... react on failures. That could be happen when the local path is wrong or the remote url returned an error code
    },
    onURLInvoked: function(url) {
        alert('Wikitude AR => PhoneGap ' + url);
    }
};