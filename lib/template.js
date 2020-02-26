// Copyright (c) 2020 L is B
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const memfs  = require('mem-fs');
const editor = require('mem-fs-editor');
const path   = require("path");
const yeoman = require("yeoman-environment");

class Template {
  constructor() {
    const env = yeoman.createEnv();
    const res = env.lookup({
      packagePatterns: 'daab',
      filePatterns: 'lib/daab.js'
    });
    this._templateRoot = path.join(res[0].packagePath, "template");
  }

  copyTo(dest, context, cb) {
    const templatePath = file => path.join(this._templateRoot, file);
    const destinationPath = file => path.join(dest, file);

    const files = [
      'bin',
      'scripts',
      '.cfignore',
      '.dockerignore',
      '.gitignore',
      'Berksfile',
      'Dockerfile',
      'external-scripts.json',
      'package.json',
      'Procfile',
      'Vagrantfile'
    ];
    const fs = editor.create(memfs.create());
    files.forEach(file => {
      fs.copyTpl(
        templatePath(file),
        destinationPath(file),
        context
      );
    });
    fs.commit(cb);
  }
}

module.exports = { Template };
