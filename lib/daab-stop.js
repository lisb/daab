#!/usr/bin/env node
// daab stop

var spawn = require('child_process').spawn;
var program = require('commander');

program
  .allowUnknownOption()
  .parse(process.argv);

var hubot = spawn('bin/hubot', ['stop'].concat(process.argv.slice(2)), {
  stdio: 'inherit'
});
