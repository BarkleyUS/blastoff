/*
* TODOS:
*
*   Test on Windows
*   Update Functions to Work on Windows
*
*/


var color = require('colors'),                          // Colorize Terminal Output
    asciiMessage = require('./asciiMessages');          // ASCII Messages


function countdown(number, banner, done) {
    if (number > 0) {
        process.stdout.write('\033c');                  // Clear Screen
        console.log(banner);                            // Display Banner
        console.log(number + '...');                    // Display Message
        setTimeout(function() {
            countdown(--number, banner, done)           // RECURSIVE - must be inside of an anon. function or calls are immediate
        }, 500);

    } else {

        (function() {
            process.stdout.write('\033c');              // Clear Screen
            done(null, true);                           // Run Done Callback
        })();

    }
}


function shell(cmd, msg, done) {                        // SHELL EXECUTION FUNCTION WITH CUSTOM STDIO
    var exec = require('child_process').exec,           // Create a New Child Process
        child = exec(cmd);                              // Execute the Command (Max Output to STDOUT = 200kb)
        errors = [];

    child.stdout.on('data', function(data) {
        msg(data);                                      // Send all normal output stream data to msg callback
    });

    child.stderr.on('data', function(data) {
        errors.push(data);                              // Log All Errors into errors array
    });

    child.on('close', function(code) {
        if (errors.length !== 0 ) {
            done(errors, null);                         // Send completed output stream data to done callback (Errors: Send Errors that Occured)
        } else {
            done(null, true);                           // Send completed output stream data to done callback (No Errors: Return True)
        }
    });
}


function spawn(cmd, args, options) {                    // SPAWN A SHELL COMMAND
    var spawn = require('child_process').spawn,         // Create a New Child Spawn
        child = spawn(cmd, args, options);              // Start the Spawn
};



function copy(src, dest) {                              // BASIC FILE COPY FUNCTION
    var rsync = 'rsync -vcr --exclude=".DS_Store"';     // Set the base rsync command
    var cmd = rsync + ' ' src + ' ' + dest;             // Set full command "rsync -vcr --exclude='.DS_Store' {src} {dest}"

    shell(cmd,                                          // Send Command to Shell
    function(data){                                     // First Callback - STDIO Normal Stream - Prepend all data with yellow "Incoming"
        console.log('Incoming: '.yellow + data)
    },
    function(err, success){                             // Second Callback - STDIO Complete
        if (err) {                                      // Errors Occured Display Errors
            console.log('Houston we have a problem: '.red);
            err.forEach(function(error){
                console.log('Error: '.yellow + error);
            });
        } else {                                        // No Errors Occured Display Custom Message
            console.log(asciiMessage.complete.red);
            console.log('       !!!!! We Have Launch !!!!!'.green);
        }
    });
}


exports.help = function() {                            // No User Defined Argument Display Help
    console.log('Blastoff Command List:'.red);
    console.log('-------------------------------------------'.red);
    console.log('blastoff launch'.green + ' - Deploys the Asset Setup');
    console.log('blastoff go / watch'.green + ' - Starts the Asset Manager');
    console.log('(sudo) npm update blastoff'.green + ' - Updates Blastoff (and other modules)');
    console.log('-------------------------------------------'.red);
}

exports.launch = function() {
    countdown(3, 'Launching in...', function(err, success) {
        if (err) {
            throw err
        } else if (success) {
            copy(__dirname + '/../default-structure/assets/', process.cwd() + '/assets/');
        }
    });
}

exports.go = function() {

    // FIND CURRENT TERMINAL PATH
    var path = process.cwd();

    // PREPARE COMMANDS FOR CHILD SPAWN     (example: sh -c 'npm run gulp')
    var cmd = 'sh';                         // shell for UNIX
    var args = ['-c', 'npm run gulp'];      // -c 'npm run gulp'
    var options = {};
    options.cwd = __dirname + '/../';       // set current working directory to parent of this file (/blastoff/lib/../)
    options.stdio = 'inherit';              // set STDIO to be directly to the parent (No Custom Output)

    // SET GULP PATH ENVIRONMENT VARIABLE - Allow ./ or ../ to asset directory
    process.env.GULP_PATH = path.indexOf('assets') != -1 ? path + "/" : path + "/assets/";

    // SPAWN CHILD GULP PROCESS
    spawn(cmd, args, options);

}
