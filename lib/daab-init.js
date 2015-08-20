#!/usr/bin/env node
// daab init

var cloneUrl = 'https://github.com/lisb/daab-starter.git';

var program = require('commander');
var spawn = require('child_process').spawn;

program
  .allowUnknownOption()
  .parse(process.argv);

function git(args, done) {
  spawn('git', args, { stdio:'inherit' })
    .on('error', function(e) { console.log('git', args); throw e; })
    .on('exit', done);
}

git(['init', '.'], function() {
  git(['remote', 'add', 'daab-starter', cloneUrl], function() {
    git(['pull', 'daab-starter', 'master'], function() {
      console.log('daab initialized.');
    });
  });
});

