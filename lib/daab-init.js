#!/usr/bin/env node
// daab init

var cloneUrl = 'https://github.com/lisb/daab-starter.git';

var program = require('commander');
var git = require('./git');

program
  .allowUnknownOption()
  .parse(process.argv);

git.init(['.'], function() {
  git.remote(['add', 'daab-starter', cloneUrl], function() {
    git.pull(['daab-starter', 'master'], function() {
      console.log('daab initialized.');
    });
  });
});

