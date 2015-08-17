#!/usr/bin/env node
// daab start

var fs = require('fs');
var spawn = require('child_process').spawn;

function checkToken() {
  if (process.env.HUBOT_DIRECT_TOKEN) return true;
  try {
    return fs.readFileSync('.env', { encoding: 'utf8' }).indexOf('HUBOT_DIRECT_TOKEN') >= 0;
  } catch (e) {
    return false;
  }
}

if (! checkToken()) {
  console.log('At first, try "daab login"');
  process.exit();
}

var hubot = spawn('bin/hubot', ['start'].concat(process.argv.slice(2)), {
  detached: true,
  stdio: 'inherit'
});

hubot.unref();

