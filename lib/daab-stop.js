#!/usr/bin/env node
// daab stop

var spawn = require('child_process').spawn;
var program = require('commander');

program
  .allowUnknownOption()
  .parse(process.argv);

var cmd = process.platform === 'win32' ? 'bin\\hubot.cmd' : 'bin/hubot';
var hubot = spawn(cmd, ['stop'].concat(process.argv.slice(2)), {
  stdio: 'inherit',
  shell: true
});
