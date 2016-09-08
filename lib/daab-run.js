#!/usr/bin/env node
// daab run

var fs = require('fs');
var spawn = require('child_process').spawn;
var program = require('commander');
var auth = require('./auth');

program
  .allowUnknownOption()
  .parse(process.argv);

if (! auth.hasToken()) {
  console.log('At first, try "daab login"');
  process.exit();
}

var cmd = process.platform === 'win32' ? 'bin\\hubot.cmd' : 'bin/hubot';
var hubot = spawn(cmd, ['run'].concat(process.argv.slice(2)), {
  stdio: 'inherit'
});
