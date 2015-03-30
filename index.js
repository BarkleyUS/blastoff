#!/usr/bin/env node

var actions = require('./lib/actions');

var args = process.argv.slice(2);


if (typeof(args[0]) != "undefined") {
    var cmd = args[0].toLowerCase();

    if (cmd === "init") {
        if (args.join(' ').indexOf('--quick') === -1) {
            actions.init(false);
        } else {
            actions.init(true);
        }
    } else if (cmd === "start" || cmd === "go" || cmd === "launch") {
        actions.start();
    } else {
        actions.help();
    }
} else {
    actions.help();
}
