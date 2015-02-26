// GULP PLUGINS
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');


// BASE ASSET DIRECTORY
var assetsDir = process.env.GULP_PATH;

var assets = {
	js: [
		assetsDir + "js/*.js",
		'!' + assetsDir + 'js/*.min.js',
		'!' + assetsDir + 'js/*.map'
	],
	sass: {
		all: [assetsDir + "sass/**/*"],
		main: [assetsDir + 'sass/*.scss']
	}
}


// JAVASCRIPT
gulp.task( 'js', function(){
	gulp.src( assets.js )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( uglify({warnings: true}) )
		.pipe( rename({suffix:'.min'}) )
		.pipe( sourcemaps.write('.'))
		.pipe( gulp.dest( assetsDir + 'js/' ) );
});


// BUILD SASS (SCSS)
gulp.task( 'sass', function(){
	gulp.src( assets.sass.main )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'compressed'}) )
		.pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest( assetsDir + 'css/' ) );
});


// GULP WATCH
gulp.task( 'watchAll', function(){
	watch( assets.js, function() { gulp.run('js') } );
	watch( assets.sass.all, function() { gulp.run('sass') } );
});


// DEFAULT TASK - keep watch at end of array
gulp.task( 'default', [ 'js', 'sass', 'watchAll' ] );
