
const ExifImage = require('exif');
var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        var self = this;
        this.exifData = "";
        this.geonameUser = "";
        //self.exifData = require("exif").exifData;
        console.log(this.name + ' helper is started!');
    },
    
    getExif(payload) {
        var self = this;
        // For some reason when sending the imagePath to the ExifImage if it's not a local filesystem path.
        //      Error: Encountered the following error while trying to read given image: 
        //          Error: ENOENT: no such file or directory, open 'C:\Users\...\MagicMirror\http:\localhost:8080\modules\MMM-BackgroundSlideshow\pictures\subfolder1\image.jpg'
        // Hard-coding a replace function to represent a local path made it work, may not work on all systems.  
        var mmPath = self.path
        var mmPath = mmPath.replace("modules/" + self.name, ""); //Get root MM directory for Linux systems (untested)
        var mmPath = mmPath.replace("modules\\" + self.name,""); //Get root MM directory for Windows systems

        var imageUrl = decodeURIComponent(payload.url); 
        var imageUri = imageUrl.replace("http://localhost:8080/",""); //TODO: Fixup later for other possible URLs
        imageUri = imageUri.replace("http://0.0.0.0:8080/",""); // For default RPi config per https://github.com/gpetersen/MMM-BackgroundSlideshowInfo/issues/4
        var imagePath = mmPath + imageUri;
        //imagePath = imagePath.replace("//g","\\"); // mixed Slash direction doesn't matter when running on Windows..
        
        // Get folder names as an array for display
        var folderNames = imageUri.split("/");

        console.log("[BACKGROUNDSLIDESHOWINFO] helper loading EXIF data for "+ imagePath);
        var ExifImage = require("exif").ExifImage;
        try {
            new ExifImage({ image : imagePath }, function (error, exifDataNew) { // This is where the Error mentioned above would fire.
                if (error){
                    console.log('[BACKGROUNDSLIDESHOWINFO] Error loading EXIF data: '+ error.message);
                    this.exifData = "";
                    exifDataNew = {};
                    exifDataNew.folderNames = folderNames;
                    exifDataNew.error = true;
                    self.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_EXIFDATA', exifDataNew);
                    self.exifData = exifDataNew;
                    //return;
                }
                else{
                    console.log("[BACKGROUNDSLIDESHOWINFO] helper successfully loaded EXIF data");
                    //console.log("[BACKGROUNDSLIDESHOWINFO] helper successfully loaded EXIF data: " + JSON.stringify(exifDataNew) );
                    exifDataNew.folderNames = folderNames;
                    exifDataNew.error = false;
                    self.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_EXIFDATA', exifDataNew);
                    self.exifData = exifDataNew;
                    self.getGeoNameData(exifDataNew);
                }
            });
        } catch (error) {
            console.log('ERROR: ' + error.message);
            this.exifData = "";
            return;
        }
        this.exifData = "";
    },

    getGeoNameData: function(exifDataNew) {
        var self = this;

        GPSLatitude = this.extract('gps.GPSLatitude',this.exifData);
        GPSLongitude = this.extract('gps.GPSLongitude',this.exifData);
         //Convert from rational64u = Degrees + Minutes/60 + Seconds/3600
         if (GPSLatitude && GPSLongitude){
             var lat  = GPSLatitude[0] + GPSLatitude[1]/60 + GPSLatitude[2]/3600; 
             if (this.extract('gps.GPSLatitudeRef',this.exifData) == "S")
                lat = lat * -1;
             var lng = (GPSLongitude[0] + GPSLongitude[1]/60 + GPSLongitude[2]/3600);
             if (this.extract('gps.GPSLongitudeRef',this.exifData) == "W")
                lng = lng * -1;
             console.log("[BACKGROUNDSLIDESHOWINFO] Getting Geonames for lat/lng: " + lat + "/" + lng);
             request({  url: 'http://api.geonames.org/findNearbyJSON?lat='+ lat +'&lng='+ lng +'&username=' + self.geonameUser,
                        method: 'GET' }, (error, response, body) => {
                            //console.log("[BACKGROUNDSLIDESHOWINFO] Response: " + response);
                            //console.log("[BACKGROUNDSLIDESHOWINFO] Body: " + body);
                            //console.log("[BACKGROUNDSLIDESHOWINFO] Error: " + error);
                            if(error){
                                console.log("[BACKGROUNDSLIDESHOWINFO] GeoName Error: " + error);
                                return;
                            }
                            var geoNames = JSON.parse(body);
                            exifDataNew.geonames = this.extract('geonames', geoNames);
                            self.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_EXIFDATA', exifDataNew);
                    });
         }
         else{
             //GPS: No Data
             console.log("[BACKGROUNDSLIDESHOWINFO] No GPS data");
             return;
         }
    },

    extract: function(propertyName, object) {
        const parts = propertyName.split(".");
        let length = parts.length;
        let i;
        let property = object || this;

        for (i = 0; i < length; i++) {
            property = property[parts[i]];
        }

        return property;
    },
    

    socketNotificationReceived: function(notification, payload) {
        //console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload.url);
        if (notification === "BACKGROUNDSLIDESHOWINFO_START") {
            if (payload.geonameUser == null || payload.geonameUser == "") {
              console.log( "[BACKGROUNDSLIDESHOWINFO] ** ERROR ** No username configured. Get an API key at https://www.geonames.org" );
            } 
            else {
                this.geonameUser = payload.geonameUser;
            }
        }
        else if(notification === "BACKGROUNDSLIDESHOWINFO_GET_EXIF"){
            console.log("[BACKGROUNDSLIDESHOWINFO] GET_EXIF - url: " + payload.url)
            this.getExif(payload);
        }
    },

});

