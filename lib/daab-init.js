#!/usr/bin/env node
// daab init

// constants
var url = 'https://github.com/lisb/daab-starter/archive/0.3.0.tar.gz';
var cloneUrl = 'https://github.com/lisb/daab-starter.git';

// dependencies
var fs = require('fs');
var path = require('path');
var program = require('commander');
var request = require('request');
var zlib = require('zlib');
var tar = require('tar');
var NodeGit = require('nodegit');

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

       setupGit(function() {
         console.log('daab initialized.');
       });
     });
  });

function setupGit(cb) {
  NodeGit.Repository.init(pwd, 0).then(function(repo) {
    repo.openIndex().then(function(index) {
      index.addAll().then(function(result) {
        index.write();
        index.writeTree().then(function(oid) {
          var author = repo.defaultSignature();
          repo.createCommit("HEAD", author, author, "generated from template.", oid)
              .then(cb);
        });
      });
    });
    
    NodeGit.Remote.create(repo, 'direct', cloneUrl);
  });
}

