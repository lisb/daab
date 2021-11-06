#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .command('init', 'setup the daab environment.')
    .command('login', 'login as a bot account.')
    .command('logout', 'logout from the service.')
    .command('run', 'run the daab. (Ctrl-C to stop)')
    .command('start', 'run the daab as a deamon.')
    .command('stop', 'stop the daab deamon.')
    .command('invites', 'show and accept a domain invite.')
    .command('version', 'show your daab version information.')
    .parse(process.argv);
