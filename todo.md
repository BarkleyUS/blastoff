# TODO

### CREATE FOLDER STRUCTURE ENVIRONMENT SETUP FILES

    Install Node Modules
    Install Ruby Gems

    If No Sibling Assets Folder
        Copy Over Default Assets Folder

######SETUP BY ENVIRONMENT

        MAC OSX
        ---------------------------------------------
        STEP 1: Download Project Git Repo from Stash
        STEP 2: Open Terminal into Template of Git Repo
        STEP 3: Navigate to desired asset location
        STEP 4: npm install {blastoff repo}
        ---------------------------------------------

### POSSIBLE CONCEPTS
    - CONCEPT: npm run create
    - CONCEPT: rsync -vcr default/assets ../



### CREATE GULP TASKS

    WATCH -
        SASS (scss) - ../assets/src/sass > ../assets/css (OLD NEED TO FIND NEW LOCATION FOR NPM)
        IMG         - ../assets/src/img > ../assets/img (OLD NEED TO FIND NEW LOCATION FOR NPM)
        JS          - ../assets/src/js  > ../assets/js (OLD NEED TO FIND NEW LOCATION FOR NPM)

    SASS (scss)
        1) SASS LINT - (Same File - NOTIFY ON FAILURE)
        2) SASS COMB - (Same File Save)
        3) SASS to CSS - ../assets/src/sass/{screen, print, ie}.scss > ../assets/css/{screen,print,ie}.css
        4) CSS Auto-Prefixer - ../assets/css/*.css
        5) CSS Minification  - ../assets/css/*.css

    IMG
        1) IMG Compression - ../assets/src/img > ../assets/img

    JS
        1) JS LINT   - (Same File - NOTIFY ON FAILURE)
        2) JS CONCAT - ../assets/src/js && ../assets/src/vendor/**/*.js > ../assets/js/script.js
        1) JS UGLIFY - ../assets/js/script.js  > ../assets/js/script.js


### DEVELOP DOCUMENTATION
    - ...

### ISSUES TO THINK THROUGH

1. **Dynamic Assets Folder Location - Hit when working on Cake PHP and Drupal**

    Description: The blastoff asset manager will be accessable to everyone if placed in certain areas.

    ###### Solution Found
    Switching to NPM so that we are just pushing an assets folder they can place it where they want it.



### OUT OF SCOPE
 - Create OS ENVIRONMENT SETUP FILES
