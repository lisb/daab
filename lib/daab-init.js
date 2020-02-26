#!/usr/bin/env node
// daab init

const program = require('commander');
const { Template } = require('./template');

program
  .allowUnknownOption()
  .parse(process.argv);

const destinationRoot = process.cwd();
const context = {};

new Template().copyTo(destinationRoot, context, () => {
  console.log('daab initialized.');
});
