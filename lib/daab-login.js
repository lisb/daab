#!/usr/bin/env node
// daab login

var program = require('commander');
var auth = require('./auth');
var direct = require("direct-js").DirectAPI.getInstance();

program
  .allowUnknownOption()
  .parse(process.argv);

if (auth.hasToken()) {
  console.log('Already logged in.');
  process.exit(1);
}

direct.setOptions({
  host:'api.direct4b.com', endpoint:'wss://api.direct4b.com/albero-app-server/api'
});
direct.listen();

direct.on('access_token_changed', function(token) {
  auth.setToken(token);
  console.log('logged in.');
  process.exit();
});

