Module.register("MMM-BackgroundSlideshowInfo",{
	// Default module config.
	defaults: {
        text: "Hello World!",
        DateTimeOriginal: "",
    },

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
        //wrapper.innerHTML = this.config.text;
        wrapper.innerHTML = this.config.DateTimeOriginal;
		return wrapper;
    },

    
    //requiresVersion: "2.1.0", // Required version of MagicMirror


    start: function() {
        //this.mySpecialProperty = "So much wow!";
        Log.log(this.name + ' is started!');
        this.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_START', 'START');
    },

    loaded: function(callback) {
        this.finishLoading();
        Log.log(this.name + ' is loaded!');
        callback();
    },


    socketNotificationReceived: function(notification, payload) {
        // if an update was received
        if (notification === 'BACKGROUNDSLIDESHOWINFO_EXIFDATA') {
            // check this is for this module based on the woeid
              //Log.info(this.name + 'Received EXIFDATA, payload:' + JSON.stringify(payload));
              Log.info("EXIF DateTimeOriginal:" + payload.exif.DateTimeOriginal);
              //DoSomething
              this.config.DateTimeOriginal = "" + payload.exif.DateTimeOriginal;
              this.updateDom();
        }
    },


  // notification handler
  notificationReceived: function(notification, payload, sender) {
      
    if (sender) {
      Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
      if(notification === 'BACKGROUNDSLIDESHOW_IMAGE_UPDATED'){
        Log.log("MMM-BackgroundSlideshowInfo: Changed Background - Loading Exif...");
        this.sendSocketNotification('GET_EXIF', payload);
      }
    } else {
      Log.log(this.name + " received a system notification: " + notification);
    }
  },

});