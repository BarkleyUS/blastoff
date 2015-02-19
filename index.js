#!/usr/bin/env node

var color = require('colors'),
    fs = require("fs"),
    path = require("path"),
    rsync = require("rsync");
    asciiMessage = require("./asciiMessages");

var args = process.argv.slice(2);

if (typeof(args[0]) == "undefined" || args[0] == "help") {

    // No User Defined Argument Display Help
    console.log('Blastoff Command List:'.red);
    console.log('-------------------------------------------'.red);
    console.log('blastoff launch'.green + ' - Deploys the Asset Setup');
    console.log('blastoff manage'.green + ' - Starts the Asset Manager');
    console.log('(sudo) npm update blastoff'.green + ' - Updates Blastoff (and other modules)');
    console.log('-------------------------------------------'.red);

} else {
    if (args[0].toLowerCase() === "launch") {

        function countdown(number) {
            if (number > 0) {
                process.stdout.write('\033c');
                console.log('Launching Blastoff');
                console.log(number + '...');
                setTimeout(function() {countdown(--number)}, 500);
            } else {
                (function() {
                    process.stdout.write('\033c');
                    copy();
                    console.log(asciiMessage.complete.red);
                })();
            }
        }

        function copy() {
            var copy = new rsync()
                .shell('ssh')
                .flags('vcr')
                .source(__dirname + "/default/assets/")
      .         destination(process.cwd() + "/assets/");

            copy.execute(function(err, code, cmd) {
                if (err) {
                    console.error(err);
                }
                console.log('Blastoff has Launched'.green);
            });
        }

        setTimeout(function(){ countdown(5) }, 500);

    }

}
