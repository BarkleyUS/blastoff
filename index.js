#!/usr/bin/env node

var actions = require('./lib/actions');

var args = process.argv.slice(2);

if (typeof(args[0]) == "undefined" || args[0] == "help") {
    actions.help();
} else {
    if (args[0].toLowerCase() === "launch") {
            console.log(args.join(' '));
        if (args.join(' ').indexOf('--quick') === -1) {
                actions.launch(false);
        } else {
            actions.launch(true);
        }
    }
    if (args[0].toLowerCase() === "start" || args[0].toLowerCase() === "go" || args[0].toLowerCase() === "watch" ) {
        actions.start();
    }
}
