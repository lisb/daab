#!/usr/bin/env node

var program = require('commander');

program
    .version('0.1.0')
    .command('init', 'setup the daab environment.')
    .command('login', 'login as a bot account.')
    .command('run', 'run the daab. (Ctrl-C to stop)')
    .command('start', 'run the daab as a deamon.')
    .command('stop', 'stop the daab deamon.')
    .command('deploy', 'upload the server.')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
}
