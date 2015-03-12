#BlastOff!

BlastOff makes front end developement easier. We crammed a handful of modern web development tools into a single resource to help setup and manage up your project's assets.

##What does it do?
First it creates your assets folder.
```
assets/
```
And folders to segragate files
```
/css/
/img/
/js/
/sass/
/vendor/
```
Then it watches the folders for changes and runs scripts relative to those changes.

##How does it work?
BlastOff works in the terminal. We're using Gulp.js to do the majority of our work for us.

###What is included:
- Autoprefixer - Don't worry about prefixing css properies
- SASS - Compiles and Compresses SASS files
- Uglify - Compress JS files
- Sourcemaps - Creates sourcemaps for CSS and JS files


#How to use BlastOff

Install BlastOff Globally 
```
instructions to install blastof go here
```

Goto your project's directory
```
cd /path_to_your_project/project_name/
```

Initialize BlastOff on your project.
```
blastoff launch
```

Start BlastOff
```
blastoff start
```

Once BlastOff has started it will watch your assets folder for changes and report any errors in the terminal. Keep the terminal window open. To hop on a project that has already been initialized simply run 'blastoff start' from your project's root.

