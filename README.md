# Module: Background Slideshow Info

Shows EXIF info for images loaded in the MMM-BackgroundSlideShow module

The `MMM-BackgroundSlideshowInfo` module is designed to work with the `MMM-BackgroundSlideshow` module to display EXIF data such as the date the picture was taken, camera, photo settings, and any other metadata that might be attached to the image.  It's designed as a separate module so you can place it where it makese sense.

TODO: Include screenshots

## Dependencies / Requirements

This module is dependant on `node-exif` to read the EXIF data from the image files.
Run: 'npm i exif' to install `node-exif`.
The image directories must also be accessible to the Magic Mirror instance.

Alternatively, you should be able to simply run 'npm i' to install the dependancy.

## Operation

The module will receive notifications from the `MMM-BackgroundSlideshow` module on image changes, then load and parse the EXIF data using node-exif.  The EXIF data is then available for the module to format and display.  You can configure the fields to display via the config.js.

## Using the module

Until the original `MMM-BackgroundSlideshow` module updates their code, you will also need an updated version of `MMM-BackgroundSlideshow` found below.  You need this module in addition to `MMM-BackgroundSlideShowInfo`.

Use Git to download. Make sure Git is installed on your system. In the command line/terminal, go to the modules directory of the your Magic Mirror install.

Run: `git clone https://github.com/gpetersen/MMM-BackgroundSlideshow.git` (This version is needed so it will send notifications when the image changes).  Then run: `git clone https://github.com/gpetersen/MMM-BackgroundSlideshowInfo.git`. 
The advantage of using Git is when there is an update, you can run 'git pull' and it will pull down all the updates. Magic Mirror can even let you know when there are updates.

Add the module to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
		module: 'MMM-BackgroundSlideshowInfo',
    header: "Picture Info",
    position: 'bottom_bar',
    config: {
       ignoreFolderNames: ['modules','pictures','MMM-BackgroundSlideshow'],
       geonameUser: "xyz",
       //showCustom: ['image.Model','exif.ISO','exif.DateTimeOriginal'],
       showFolderNames: true,
       showFileName: false,
    }
  }
];


```

## Known Issues

TODO: Add issues

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>showFolderNames</code></td>
			<td>Boolean value, true to show folder names in the path to the picture, often more useful than the filename.  You can then filter the list to ignore/trim paths that are generic or not useful to show like 'pictures'<br>
				<br><b>Example:</b> <code>showFolderNames: false,</code>
				<br><b>Default value:</b> <code>true</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>ignoreFolderNames</code></td>
			<td>Array value containing strings. Each string should specify a folder name in the path to the images.  The names of these folders will not be displayed.<br>
				<br><b>Example:</b> <code>ignoreFolderNames: ['modules','pictures','MMM-BackgroundSlideshow'],</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showFileName</code></td>
			<td>Boolean value, true to show file names of the picture, often not useful.<br>
				<br><b>Example:</b> <code>showFileName: true,</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showCreateDate</code></td>
			<td>Boolean value, true to show the date the picture was created per the parsed Exif data in the picture.  This date is formatted using formatDate below.<br>
				<br><b>Example:</b> <code>showCreateDate: true,</code>
				<br><b>Default value:</b> <code>true</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>formatDate</code></td>
			<td>Format for any dates retrieved from Exif data.<br>
				<br><b>Example:</b> <code>formatDate: "YYYY MMMM Do",</code>
				<br><b>Default value:</b> <code>"YYYY MMMM Do"</code> 2001 January 5th
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showMake</code></td>
			<td>Boolean value, true to show the camera Make from Exif data. NOTE: Often the make is included in the model below, so it's disabled by default.<br>
				<br><b>Example:</b> <code>showMake: true,</code>
				<br><b>Default value:</b> <code>false</code> 
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showModel</code></td>
			<td>Boolean value, true to show the camera Model from Exif data. NOTE: Often the make is included in the Model Exif data as well.<br>
				<br><b>Example:</b> <code>showMake: false,</code>
				<br><b>Default value:</b> <code>true</code> 
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showGPS</code></td>
			<td>Boolean value, true to show the GPS location from Exif data using a geoname lookup.  NOTE: You must specify a geonameUser if you use this feature. http://www.geonames.org/<br>
				<br><b>Example:</b> <code>showGPS: false,</code>
				<br><b>Default value:</b> <code>false</code> 
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>showGPSFields</code></td>
			<td>Array value containing strings. Each string should specify the geoname field names to be displayed. http://www.geonames.org/<br>
				<br><b>Example:</b> <code>showGPSFields: ['name','countryCode','adminName1'],</code>
				<br><b>Default value:</b> <code>['name','countryCode','adminName1']</code> 
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>geonameUser</code></td>
			<td>String value, specifies the username requred to use http://www.geonames.org/ if using the showGPS feature.<br>
				<br><b>Example:</b> <code>geonameUser: "xyz",</code> You must register for an ID here: http://www.geonames.org/
				<br><b>Default value:</b> <code>''</code> 
				<br>This value is <b>MANDATORY</b> Only Mandatory if using showGPS.
			</td>
		</tr>
		<tr>
			<td><code>showCustom</code></td>
			<td>Array value containing strings. Each string should specify path to a field in the ExifImage object model.  NOTE: Dates will be formatted using the format provided in formatDate.<br>
				<br><b>Example:</b> <code>showCustom: ['exif.FNumber','exif.ISO','exif.DateTimeOriginal'],</code>
				<br><b>Default value:</b> <code>[]</code> 
				<br>This value is <b>MANDATORY</b>
			</td>
		</tr>

</table>
