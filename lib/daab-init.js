#!/usr/bin/env node
// daab init

// constants
var url = 'https://github.com/lisb/daab-starter/archive/0.3.0.tar.gz';

// dependencies
var fs = require('fs');
var path = require('path');
var program = require('commander');
var request = require('request');
var zlib = require('zlib');
var tar = require('tar');

program
  .allowUnknownOption()
  .parse(process.argv);

var pwd = process.cwd();

request(url).pipe(zlib.createGunzip()).pipe(tar.Extract({ path:pwd, strip:1 }))
  .on('error', function(err) {
    throw err;
  })
  .on('finish', function() {
     fs.chmod('./bin/hubot', 0755, function(err) {
       if (err) throw err;
       console.log('daab initialized.');
     });
  });
