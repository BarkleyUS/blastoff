#!/usr/bin/env node

var actions = require('./lib/actions');

var args = process.argv.slice(2);

if (typeof(args[0]) != "undefined") {
    if (args[0].toLowerCase() === "init") {
        if (args.join(' ').indexOf('--quick') === -1) {
            actions.init(false);
        } else {
            actions.init(true);
        }
    } else if (args[0].toLowerCase() === "start" || args[0].toLowerCase() === "go" || args[0].toLowerCase() === "watch" || args[0].toLowerCase() === "launch") {
        actions.start();
    } else {
        actions.help();
    }
} else {
    actions.help();
}
