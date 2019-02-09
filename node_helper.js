
const ExifImage = require('exif');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

    start: function() {
        var self = this;
        //self.exifData = require("exif").exifData;
        console.log(this.name + ' helper is started!');
    },
    
    getExif(payload) {
        var self = this;
        var imageUrl = "C:\\Users\\Hub\\MagicMirror\\" + decodeURIComponent(payload.url); //Had to add "" for some reason.. 
        console.log("Start getExif - url: " + imageUrl);
        // Returns: 'C:\Users\Hub\MagicMirror\http:\localhost:8080\modules\MMM-BackgroundSlideshow\pictures\Phil%20-%20Adelyn%201%20yr%20photos\JPEG\IMG_1638.jpg'
        var imagePath = imageUrl.replace("http://localhost:8080/",""); //TODO: Fixup later for other possible URLs
        imagePath = imagePath.replace("//g","\\");
        console.log("imagePath: "+ imagePath);
        var ExifImage = require("exif").ExifImage;
        console.log("exif object created");
        try {
            new ExifImage({ image : imagePath }, function (error, exifData) {
                if (error){
                    console.log('Error: '+error.message);
                }
                else{
                    //console.log(exifData); // Do something with your data!
                    var exifJSON = JSON.stringify(exifData);
                    console.log("SUCCESS! Sending ImageExifData: " + exifJSON );
                    self.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_EXIFDATA', exifData);
                }
            });
        } catch (error) {
            console.log('ERROR: ' + error.message);
        }
        //console.log("================================ExifData made it out?")
        //console.log("ImageExifData: " + JSON.stringify(self.exifJSON));
        //this.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_EXIFDATA', self.exifJSON);
        //return exifData;

    },

    socketNotificationReceived: function(notification, payload) {
        //console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload.url);
        console.log("socketnotifrecievedinhelper - url: " + payload.url)
        this.getExif(payload);
    },

});

