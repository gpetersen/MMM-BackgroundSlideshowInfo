Module.register("MMM-BackgroundSlideshowInfo",{
	// Default module config.
	defaults: {

        ignoreFolderNames: ['modules','pictures','MMM-BackgroundSlideshow'],
        showFolderNames: true,
        showFileName: false,
        showCreateDate: true,
        createDateLabel: "",
        formatDate: "YYYY MMMM Do",
        showMake: false,
        showModel: true,
        showGPS: true,
        showGPSFields: ['name','countryCode','adminName1'],
        geonameUser: "",
        showCustom: [], //showCustom: ['image.Model','exif.ISO','exif.DateTimeOriginal'], //ExifImage object model below:

        /*
        ExifImage [{
            image: {
                Make: 'FUJIFILM',
                Model: 'FinePix40i',
                Orientation:  1,
                XResolution:  72,
                YResolution:  72,
                ResolutionUnit:  2,
                Software:  'Digital Camera FinePix40i Ver1.39',
                ModifyDate:  '2000:08:04 18:22:57',
                YCbCrPositioning:  2,
                Copyright:  '          ',
                ExifOffset:  250
            },
            thumbnail: {
                Compression:  6,
                Orientation:  1,
                XResolution:  72,
                YResolution:  72,
                ResolutionUnit:  2,
                ThumbnailOffset:  1074,
                ThumbnailLength:  8691,
                YCbCrPositioning:  2
            },
            exif: {
                FNumber:  2.8,
                ExposureProgram:  2,
                ISO:  200,
                ExifVersion:  "",//<Buffer 30 32 31 30>,
                DateTimeOriginal:  '2000:08:04 18:22:57',
                CreateDate:  '2000:08:04 18:22:57',
                ComponentsConfiguration:  "",//<Buffer 01 02 03 00>,
                CompressedBitsPerPixel:  1.5,
                ShutterSpeedValue:  5.5,
                ApertureValue:  3,
                BrightnessValue:  0.26,
                ExposureCompensation:  0,
                MaxApertureValue:  3,
                MeteringMode:  5,
                Flash:  1,
                FocalLength:  8.7,
                MakerNote:  "",//<Buffer 46 55 4a 49 46 49 4c 4d 0c 00 00 00 0f 00 00 00 07 00 04 00 00 00 30 31 33 30 00 10 02 00 08 00 00 00 c6 00 00 00 01 10 03 00 01 00 00 00 03 00 00 00 02 ...>,
                FlashpixVersion:  "",//<Buffer 30 31 30 30>,
                ColorSpace:  1,
                ExifImageWidth:  2400,
                ExifImageHeight:  1800,
                InteropOffset:  926,
                FocalPlaneXResolution:  2381,
                FocalPlaneYResolution:  2381,
                FocalPlaneResolutionUnit:  3,
                SensingMethod:  2,
                FileSource:  "",//<Buffer 03>,
                SceneType:  "",//<Buffer 01>
            },
            gps: {},
            interoperability: {
                InteropIndex:  'R98',
                InteropVersion:  ""//<Buffer 30 31 30 30>
            },
            makernote: {
                Version:  "",//<Buffer 30 31 33 30>,
                Quality:  'NORMAL ',
                Sharpness:  3,
                WhiteBalance:  0,
                FujiFlashMode:  1,
                FlashExposureComp:  0,
                Macro:  0,
                FocusMode:  0,
                SlowSync:  0,
                AutoBracketing:  0,
                BlurWarning:  0,
                FocusWarning:  0,
                ExposureWarning:  0
            }
        }],
        */
    },
    
    requiresVersion: "2.1.0", // Required version of MagicMirror

	// Override dom generator.
	getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.id = "BGSS_CONTAINER";
        var info = document.createElement("div")
        info.id = "BGSS_INFO"
        var infoFolderNames = document.createElement("div");
        infoFolderNames.id = "BGSS_FOLDERS";
        var infoFileName = document.createElement("div");
        infoFileName.id = "BGSS_FILE";
        var infoDate = document.createElement("div");
        infoDate.id = "BGSS_DATE";
        var infoMakeModel = document.createElement("div");
        infoMakeModel.id = "BGSS_MAKEMODEL";
        var infoLocation = document.createElement("div");
        infoLocation.id = "BGSS_LOCATION";
        var infoCustom = document.createElement("div");
        infoCustom.id = "BGSS_CUSTOM";

        info.appendChild(infoFolderNames);
        info.appendChild(infoFileName);
        info.appendChild(infoDate);
        info.appendChild(infoMakeModel);
        info.appendChild(infoLocation);
        info.appendChild(infoCustom);
        
        wrapper.appendChild(info);
		return wrapper;
    },

    updateView: function(){
        var wrapper = document.getElementById("BGSS_CONTAINER")

        if(this.config.showFolderNames || this.config.showFileName){
            /* Filtering arrays - used to remove folder names in "ignoreFolderNames" array from the path
            var array1 = ['a', 'b', 'c', 'd', 'e'];
            var array2 = ['b', 'd', 'f'];

            array1 = array1.filter(function(item) {
            return !array2.includes(item); 
            })
            console.log(array1); // [ 'a', 'c', 'e' ]
            console.log(array2); // [ 'b', 'd', 'f' ]
            */
            var ignoreFolderNames = this.config.ignoreFolderNames;
            var folderNames = this.exifData.folderNames.filter(function(item) {
                    return !ignoreFolderNames.includes(item); 
                })

            var names = "";
            var fileName = "";
            var fileNameIndex = folderNames.length - 1;
            for (key in folderNames){
                if(key == fileNameIndex){
                    fileName = folderNames[key];
                }
                else{
                    names = names + " " + folderNames[key];
                }
            }

            var folders = document.getElementById("BGSS_FOLDERS");
            if(this.config.showFolderNames){
                folders.innerHTML = names;
            }

            var file = document.getElementById("BGSS_FILE");
            if(this.config.showFileName){
                file.innerHTML = fileName;
            }
        }

        if(this.config.showCreateDate){
            //formatDate: "YYYY MMMM Do",
            var date = this.parseExifDate(this.exifData.exif.DateTimeOriginal);
            var dateDiv = document.getElementById("BGSS_DATE");
            dateDiv.innerHTML = this.config.createDateLabel + moment(date).format(this.config.formatDate);
        }

        if(this.config.showMake || this.config.showModel){
            var makeModel = document.getElementById("BGSS_MAKEMODEL");
            makeModel.innerHTML = "";
            if(this.config.showMake){
                makeModel.innerHTML = this.exifData.image.Make;
            }
            if(this.config.showModel){
                makeModel.innerHTML += this.exifData.image.Model;
            }
        }
        
        if(this.config.showGPS){
            var location = document.getElementById("BGSS_LOCATION");
            var geonames = this.extract('geonames',this.exifData);
            var locationInfo = ""
            if(geonames){
                for(key in geonames)
                {
                    var geoname = geonames[key];
                    for(configIndex in this.config.showGPSFields){
                        var configKey = this.config.showGPSFields[configIndex];
                        var value = this.extract(configKey,geoname);
                        locationInfo = locationInfo + value;
                    }
                }
            }
            location.innerHTML = locationInfo;
        }

        for(configIndex in this.config.showCustom){
            var custom = document.getElementById("BGSS_CUSTOM");
            var configKey = this.config.showCustom[configIndex];
            var value = this.extract(configKey,this.exifData);
            var customInfo = "";
            if(configKey.includes("Date")){
                value = moment(this.parseExifDate(value)).format(this.config.formatDate);
            }
            customInfo = customInfo + value;
            custom.innerHTML = customInfo;
        }

        this.exifData = ""
		return wrapper;
    },



    getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},

    start: function() {
        this.exifData = "";
        var payload = {};
        payload.geonameUser = this.config.geonameUser; 
        this.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_START', payload);
        Log.log(this.name + ' is started!');
    },

    loaded: function(callback) {
        this.finishLoading();
        Log.log(this.name + ' is loaded!');
        callback();
    },


    parseExifDate: function(exifDate){
        /* Parse date string in YYYY-MM-DD hh:mm:ss format
        ** separator can be any non-digit character
        ** e.g. 2017:03:09 14:49:21
        */
        var b = exifDate.split(/\D/);
        return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]);
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
        // if an update was received
        if (notification === 'BACKGROUNDSLIDESHOWINFO_EXIFDATA') {
            this.exifData = {};
            this.exifData = payload;
            this.updateView();
        }
    },   

  // notification handler
  notificationReceived: function(notification, payload, sender) {
      
    if (sender) {
      Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
      if(notification === 'BACKGROUNDSLIDESHOW_IMAGE_UPDATED'){
        Log.log("MMM-BackgroundSlideshowInfo: Changed Background - Loading Exif...");
        this.sendSocketNotification('BACKGROUNDSLIDESHOWINFO_GET_EXIF', payload);
      }
    } else {
      Log.log(this.name + " received a system notification: " + notification);
    }
  },

});