#!/usr/bin/env node
// daab login

var program = require('commander');
var auth = require('./auth');

program
  .allowUnknownOption()
  .parse(process.argv);

if (! auth.hasToken()) {
  console.log('not logged in.');
  process.exit(1);
}

auth.setToken(null);
console.log('logged out.');
