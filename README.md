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

Use Git to download. Make sure Git is installed on your system. In the command line/terminal, go to the modules directory of the your Magic Mirror install. run: 'git clone https://github.com/gpetersen/MMM-BackgroundSlideshow.git'.  Then run 
'git clone https://github.com/gpetersen/MMM-BackgroundSlideshowInfo.git'. The advantage of using Git is when there is an update, you can run 'git pull' and it will pull down all the updates. Magic Mirror can even let you know when there are updates.

Add the module to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: 'MMM-BackgroundSlideshow',
    position: 'fullscreen_below',
    config: {
      imagePaths: ['modules/MMM-BackgroundSlideshow/example1'],
      transitionImages: true,
      randomizeImageOrder: true
    }
  }
];

	{
		module: 'MMM-BackgroundSlideshowInfo',
		position: 'bottom_bar',
		config: {
			...
		}

	}
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
		<tr>
			<td><code>randomizeImageOrder</code></td>
			<td>Boolean value, if true will randomize the order of the images, if false will use an alphabetical sorting by filename.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
        <tr>
			<td><code>recursiveSubDirectories</code></td>
			<td>Boolean value, if true it will scan all sub-directories in the imagePaths.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
        <tr>
			<td><code>validImageFileExtensions</code></td>
			<td>String value, a list of image file extensions, seperated by commas, that should be included. Files found without one of the extensions will be ignored.<br>
				<br><b>Example:</b> <code>'png,jpg'</code>
				<br><b>Default value:</b> <code>'bmp,jpg,gif,png'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    <tr>
			<td><code>transitionSpeed</code></td>
			<td>Transition speed from one image to the other, transitionImages must be true. Must be a valid css transition duration.<br>
				<br><b>Example:</b> <code>'2s'</code>
				<br><b>Default value:</b> <code>'1s'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    <tr>
			<td><code>backgroundSize</code></td>
			<td>The sizing of the background image. Values can be:<br>
        cover: Resize the background image to cover the entire container, even if it has to stretch the image or cut a little bit off one of the edges.<br>
        contain: Resize the background image to make sure the image is fully visible<br>
				<br><b>Example:</b> <code>'contain'</code>
				<br><b>Default value:</b> <code>'cover'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    <tr>
			<td><code>transitionImages</code></td>
			<td>Transition from one image to the other (may be a bit choppy on slower devices, or if the images are too big).<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    <tr>
			<td><code>gradient</code></td>
			<td>The vertical gradient to make the text more visible.  Enter gradient stops as an array.<br>
				<br><b>Example:</b> <code>[
      "rgba(0, 0, 0, 0.75) 0%",
      "rgba(0, 0, 0, 0) 40%"
    ]</code>
				<br><b>Default value:</b> <code>[
      "rgba(0, 0, 0, 0.75) 0%",
      "rgba(0, 0, 0, 0) 40%",
      "rgba(0, 0, 0, 0) 80%",
      "rgba(0, 0, 0, 0.75) 100%"
    ]</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>horizontalGradient</code></td>
			<td>The horizontal gradient to make the text more visible.  Enter gradient stops as an array.<br>
				<br><b>Example:</b> <code>[
      "rgba(0, 0, 0, 0.75) 0%",
      "rgba(0, 0, 0, 0) 40%"
    ]</code>
				<br><b>Default value:</b> <code>[
      "rgba(0, 0, 0, 0.75) 0%",
      "rgba(0, 0, 0, 0) 40%",
      "rgba(0, 0, 0, 0) 80%",
      "rgba(0, 0, 0, 0.75) 100%"
    ]</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    <tr>
			<td><code>gradientDirection</code></td>
			<td>The direction of the gradient<br>
				<br><b>Example:</b> <code>'horizontal'</code>
				<br><b>Default value:</b> <code>'vertical'</code>
				<br><b>Possible values:</b> <code>'vertical', 'horizontal', 'both'</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
    </tbody>
</table>
