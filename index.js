#!/usr/bin/env node

var color = require('colors');

var fs = require("fs"),
path = require("path");

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

        // process.stdout.write('\033c');

        console.log('Launching Blastoff');

        //
        // function countdown(number) {
        //     if (number > 0) {
        //         console.log(number + '...');
        //         setTimeout(countdown(--number), 2000);
        //     }
        // }
        //
        // setTimeout(countdown(5), 2000);

    }

    if (args[0].toLowerCase() === "path") {
        // CURRENT DIRECTORY
        console.log(process.cwd());
    }
}
