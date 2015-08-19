#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .command('init', 'setup the daab environment.')
    .command('login', 'login as a bot account.')
    .command('run', 'run the daab. (Ctrl-C to stop)')
    .command('start', 'run the daab as a deamon.')
    .command('stop', 'stop the daab deamon.')
    .command('deploy', 'upload the server.')
    .parse(process.argv);
