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


// JAVASCRIPT
gulp.task( 'js', function(){
	gulp.src( ['!' + assetsDir + 'js/*.min.js', assetsDir + 'js/*.js'])
		.pipe( plumber() )
		.pipe( gulp.dest( assetsDir + 'js/' ) )
		.pipe( rename({suffix:'.min'}) )
		.pipe( uglify({warnings: true}) )
		.pipe( gulp.dest( assetsDir + 'js/' ) );
});


// BUILD SASS (SCSS)
gulp.task( 'sass', function(){
	gulp.src( [assetsDir + 'sass/screen.scss', assetsDir + 'sass/ie.scss', assetsDir + 'sass/print.scss'])
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'compressed'}) )
		.pipe( sourcemaps.write() )
		.pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
		.pipe( gulp.dest( assetsDir + 'css/' ) );
});


// GULP WATCH
gulp.task( 'watch', function(){
	gulp.watch( assetsDir + 'js/*.js', ['js'] );
	gulp.watch( assetsDir + 'sass/**/*.scss', ['sass'] );
});


// DEFAULT TASK - keep watch at end of array
gulp.task( 'default', [ 'js', 'sass', 'watch' ] );
