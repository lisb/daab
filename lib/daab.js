#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');

program
    .version(`daab CLI: ${pkg.version}\n(Are you sure you're not confusing it with 'daab version'? If you want to check the SDK packages, use 'daab version' instead.)`)
    .command('init', 'setup the daab environment.')
    .command('login', 'login as a bot account.')
    .command('logout', 'logout from the service.')
    .command('run', 'run the daab. (Ctrl-C to stop)')
    .command('start', 'run the daab as a deamon.')
    .command('stop', 'stop the daab deamon.')
    .command('invites', 'show and accept a domain invite.')
    .command('version', "show the version information of your daab environment (not CLI).")
    .parse(process.argv);
