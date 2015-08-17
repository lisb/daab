#!/usr/bin/env node
// daab init

// constants
var url = 'https://direct4b.com/ja/bot/dev/samples/starter/starter-0.2.1.zip';

// std 
var fs = require('fs');
var path = require('path');

// third party
var request = require('request');
var unzip = require('unzip');

request(url).pipe(unzip.Extract({ path: './' }))
  .on('error', function(err) {
    throw err;
  })
  .on('finish', function() {
     fs.chmod('./bin/hubot', 0755, function(err) {
       if (err) throw err;
       console.log('daab initialized.');
     });
  });

