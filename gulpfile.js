// Include Gulp Plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

// Asset Location
var assetsDir = '';



// Build JS
gulp.task( 'js', function(){
	gulp.src( assetsDir + 'js/*.js')
		.pipe( plumber() )
		.pipe( gulp.dest( assetsDir + 'js/' ) )
		.pipe( rename({suffix:'.min'}) )
		.pipe( uglify() )
		.pipe( gulp.dest( assetsDir + 'js/min/' ) );
});

// Build Scss
gulp.task( 'sass', function(){
	gulp.src( assetsDir + 'sass/screen.scss' )
		.pipe( plumber() )
		.pipe( sass({outputStyle: 'compressed'}) )
		.pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
		.pipe( gulp.dest( assetsDir + 'css/' ) );
});


// Gulp Watch
gulp.task( 'watch', function(){
	gulp.watch( assetsDir + 'js/*.js', ['js'] );
	gulp.watch( assetsDir + 'sass/**/*.scss', ['sass'] );
});


// keep watch at end of array
gulp.task( 'default', [ 'js', 'sass', 'watch' ] );