var color = require('colors'),
    fs = require("fs"),
    path = require("path"),
    asciiMessage = require("./asciiMessages");

    function countdown(number, callback) {
        if (number > 0) {
            process.stdout.write('\033c');
            console.log('Launching In:');
            console.log(number + '...');
            setTimeout(function() {countdown(--number, callback)}, 500);
        } else {
            (function() {
                process.stdout.write('\033c');
                callback(null, true);
            })();
        }
    }

    function shell(cmd, msg, done) {
        var exec = require('child_process').exec,
            child = exec(cmd);
            errors = [];

        child.stdout.on('data', function(data) {
            msg(data);
        });

        child.stderr.on('data', function(data) {
            errors.push(data);
        });

        child.on('close', function(code) {
            if (errors.length !== 0 ) {
                done(errors, null);
            } else {
                done(null, true)
            }
        });
    }

    function copy(src, dest) {
        var cmd = 'rsync -vcr --exclude=".DS_Store" ' + src + ' ' + dest;

        shell(cmd, function(data){
            console.log('Incoming Message: '.yellow + data)
        },
        function(err, success){
            if (err) {
                console.log('Houston we have a problem: '.red);
                err.forEach(function(error){
                    console.log("ERROR: ".yellow + error);
                });
            } else {
                console.log(asciiMessage.complete.red);
                console.log('       !!!!! We Have Launch !!!!!'.green);
            }
        });
    }


exports.help = function() {
    // No User Defined Argument Display Help
    console.log('Blastoff Command List:'.red);
    console.log('-------------------------------------------'.red);
    console.log('blastoff launch'.green + ' - Deploys the Asset Setup');
    console.log('blastoff manage'.green + ' - Starts the Asset Manager');
    console.log('(sudo) npm update blastoff'.green + ' - Updates Blastoff (and other modules)');
    console.log('-------------------------------------------'.red);
}

exports.launch = function() {
    countdown(5, function(err, success) {
        if (err) {
            throw err
        } else if (success) {
            copy(__dirname + "/../default-structure/assets/", process.cwd() + "/assets/");
        }
    });
}
