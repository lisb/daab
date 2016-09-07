#!/usr/bin/env node
// daab login

var program = require('commander');
var auth = require('./auth');
var direct = require("direct-js").DirectAPI.getInstance();
var proxyURL = process.env.HUBOT_DIRECT_PROXY_URL || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

program
  .allowUnknownOption()
  .parse(process.argv);

if (auth.hasToken()) {
  console.log('Already logged in.');
  process.exit(1);
}

direct.setOptions({
  host:'api.direct4b.com', endpoint:'wss://api.direct4b.com/albero-app-server/api', proxyURL: proxyURL
});
direct.listen();

direct.on('access_token_changed', function(token) {
  auth.setToken(token);
  console.log('logged in.');
  process.exit();
});

