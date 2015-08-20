#!/usr/bin/env node
// daab start

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

var hubot = spawn('bin/hubot', ['start'].concat(process.argv.slice(2)), {
  detached: true,
  stdio: 'inherit'
});

hubot.unref();
