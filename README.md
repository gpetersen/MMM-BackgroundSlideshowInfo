# Module: Background Slideshow Info

Shows EXIF info for images loaded in the MMM-BackgroundSlideShow module

The `MMM-BackgroundSlideshowInfo` module is designed to work with the `MMM-BackgroundSlideshow` module to display EXIF data such as the date the picture was taken, camera, photo settings, and any other metadata that might be attached to the image.

TODO: Include screenshots

## Dependencies / Requirements

This module is dependant on `node-exif` to read the EXIF data from the image files.
Run: 'npm i exif' to install `node-exif`.
The image directories must also be accessible to the Magic Mirror instance.

## Operation

The module will receive notifications from the `MMM-BackgroundSlideshow` module on image changes, then load and parse the EXIF data using node-exif.  The EXIF data is then available for the module to format and display.  You can configure the fields to display via the config.js.

## Using the module

Until the original `MMM-BackgroundSlideshow` module updates their code, you will also need an updated version of `MMM-BackgroundSlideshow` found below.  You need this module in addition to `MMM-BackgroundSlideShowInfo`.

Use Git to download. Make sure Git is installed on your system. In the command line/terminal, go to the modules directory of the your Magic Mirror install. 
Run: `git clone https://github.com/gpetersen/MMM-BackgroundSlideshow.git`.  
Then run: `git clone https://github.com/gpetersen/MMM-BackgroundSlideshowInfo.git`. 
The advantage of using Git is when there is an update, you can run 'git pull' and it will pull down all the updates. Magic Mirror can even let you know when there are updates.

Add the module to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: 'MMM-BackgroundSlideshowInfo',
    position: 'bottom_bar',
    config: {
      //...TODO Add more config options
    }
  }
];


```
TODO: Edit below

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
			<td><code>imagePaths</code></td>
			<td>Array value containing strings. Each string should be a path to a directory where image files can be found.<br>
				<br><b>Example:</b> <code>['modules/MMM-ImageSlideshow/example1']</code>
				<br>This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>slideshowSpeed</code></td>
			<td>Integer value, the length of time to show one image before switching to the next, in milliseconds.<br>
				<br><b>Example:</b> <code>6000</code> for 6 seconds
				<br><b>Default value:</b> <code>10000</code> or 10 seconds
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    </tbody>
</table>
