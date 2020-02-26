// Copyright (c) 2020 L is B
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const memfs  = require('mem-fs');
const editor = require('mem-fs-editor');
const path   = require('path');
const yeoman = require('yeoman-environment');

class Template {
  constructor() {
    const env = yeoman.createEnv();
    const res = env.lookup({
      packagePatterns: 'daab',
      filePatterns: 'lib/daab.js'
    });
    this._templateRoot = path.join(res[0].packagePath, "template");
  }

  get requires() {
    return [
      'bin',
      'scripts',
      '.gitignore',
      'external-scripts.json',
      'package.json'
    ];
  }

  get choices() {
    return ['.cfignore', '.dockerignore', 'Berksfile', 'Dockerfile', 'Procfile', 'Vagrantfile'];
  }

  questions(defaults) {
    return [
      {
        name: 'packageName',
        message: 'package name',
        default: defaults['packageName']
      },
      {
        name: 'version',
        message: 'version',
        default: '0.1.0'
      },
      {
        name: 'description',
        message: 'description'
      },
      {
        name: 'author',
        message: 'author'
      },
      {
        name: 'files',
        type: 'checkbox',
        message: 'choose files you need',
        choices: this.choices
      },
    ];
  }

  copyTo(dest, context, cb) {
    const templatePath    = file => path.join(this._templateRoot, file);
    const destinationPath = file => path.join(dest, file);

    const fs = editor.create(memfs.create());
    this.requires.forEach(entry => {
      fs.copyTpl(
        templatePath(entry),
        destinationPath(entry),
        context
      );
    });
    this.choices.filter(c => context.files.includes(c)).forEach(entry => {
      fs.copy(
        templatePath(entry),
        destinationPath(entry),
      );
    })
    fs.commit(cb);
  }
}

module.exports = { Template };
