var color = require('colors'),                  // Colorize Terminal Output
    os = require('os');                         // Determine OS Platform
    asciiMessage = require('./asciiMessages');  // ASCII Messages


function countdown(number, banner, done) {
    if (number > 0) {
        clearScreen();
        console.log(banner);
        console.log(number + '...');
        // Timeout function calls are immediate if not an anonmous function
        setTimeout(function() { countdown(--number, banner, done) }, 500);
    } else {
        (function() {
            clearScreen();
            done(null, true);
        })();
    }
}


function clearScreen() {
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');
}


function isWindows() {
    return os.platform() === "win32";
}


function shell(cmd, msg, done) {
// Shell Execute (Runs Command Once) - (Max Output STDOUT 200kb)
    var exec = require('child_process').exec,
        child = exec(cmd);
        errors = [];

    child.stdout.on('data', function(data) {
        msg(data);
    });

    child.stderr.on('data', function(data) {
        // Log all Errors into array
        errors.push(data);
    });

    child.on('close', function(code) {
        if (errors.length !== 0 ) {
            done(errors, null);
        } else {
            done(null, true);
        }
    });
}


function spawn(cmd, args, options) {
// Spawn Child Thread - (Run Command Continually) - (Continual STDOUT Stream)
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args, options);
};


function copy(src, dest) {
// Copy Function

    var base = '';
    var args = [];
    var cmd = '';

    if (isWindows()) {
        base = 'xcopy'   // Use XCOPY for windows
        args.push('/S'); // Copy folders and subfolders
        args.push('/I'); // Assume the destination is a folder
        args.push('/Y'); // Suppress prompt to confirm overwriting a file.
        cmd = base + ' ' + src.replace(/\//g, '\\') + ' ' + dest.replace(/\//g, '\\') + ' ' + args.join(' ');
    } else {
        base = 'rsync'; // Use rsync for UNIX
        args.push('-vcr'); // v = verbose (show details), c = checksum (verify transfer), r = recursive (transfer subfolders)
        args.push('--exclude=".DS_Store"');
        cmd = base + ' ' + args.join(' ') + ' "' + src + '" "' + dest + '"';
    }

    shell(cmd,
    function(data){
        // STDIO Normal Stream - Prepend all data "Incoming: "
        console.log('Incoming: '.yellow + data)
    },
    function(err, success){
        // STDIO Complete
        if (err) {
            console.log('Houston we have a problem: '.red);
            err.forEach(function(error){
                console.log('Error: '.yellow + error);
            });
        } else {
            console.log(asciiMessage.launch.red);
            console.log('        !!!!! We Have Launch !!!!!'.green);
        }
    });
}


exports.help = function() {
    console.log('');
    console.log('Blastoff Command List:'.red);
    console.log('-------------------------------------------'.red);
    console.log('blastoff launch'.green + ' - Deploys the Default Asset Structure');
    console.log('blastoff start'.green + ' - Starts the Asset Manager');
    console.log('(sudo) npm update -g barkley-blastoff'.green + ' - Update Blastoff (and other dependencies)');
    console.log('-------------------------------------------'.red);
}

exports.launch = function(quick) {
    var paths = {
        src : __dirname.substring(0, __dirname.length - 4) + '/default-structure/assets/',
        dest : process.cwd() + '/assets'
    };

    if (isWindows()) {
        paths.src += '*';
    }

    if (quick){
        copy(paths.src, paths.dest);
    } else {
        countdown(3, 'Launching in...', function(err, success) {
            if (err) {
                throw err
            } else if (success) {
                copy(paths.src, paths.dest);
            }
        });
    }
}

exports.start = function() {
    // Set path to current terminal location
    var path = process.cwd();

    if (isWindows()) {
        // WINDOWS COMMAND: cmd /c 'npm run gulp'
        var cmd = 'cmd';
        var args = ['/c', 'npm run gulp'];
    } else {
        // UNIX COMMAND: sh -c 'npm run gulp'
        var cmd = 'sh';
        var args = ['-c', 'npm run gulp'];
    }

    var options = {
        cwd : __dirname + '/../',   // set current working directory to parent of this file (/blastoff/lib/../actions.js)
        stdio : 'inherit'           // Send STDIO directly to the parent
    };

    // Set GULP_PATH env variable based on location. Allow ./assets or ../assets
    process.env.GULP_PATH = path.indexOf('assets') != -1 ? path + "/" : path + "/assets/";
    spawn(cmd, args, options);
}
