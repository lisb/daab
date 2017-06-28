#!/usr/bin/env node
// daab login

var program = require('commander');
var auth = require('./auth');
var direct = require("direct-js").DirectAPI.getInstance();
var url = require('url');
require('dotenv').config();
var proxyURL = process.env.HUBOT_DIRECT_PROXY_URL || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
var endpoint = process.env.HUBOT_DIRECT_ENDPOINT || "wss://api.direct4b.com/albero-app-server/api";

program
  .allowUnknownOption()
  .parse(process.argv);

if (auth.hasToken()) {
  console.log('Already logged in.');
  process.exit(1);
}

direct.setOptions({
  host:url.parse(endpoint).host, endpoint:endpoint, proxyURL: proxyURL
});
direct.listen();

direct.on('access_token_changed', function(token) {
  auth.setToken(token);
  console.log('logged in.');
  process.exit();
});

