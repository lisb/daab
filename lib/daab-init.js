#!/usr/bin/env node
// daab init

const program = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const { Template } = require("./template");

program.allowUnknownOption().parse(process.argv);

const template = new Template();
const destinationRoot = process.cwd();
const defaults = {
  packageName: path.basename(destinationRoot)
};

inquirer.prompt(template.questions(defaults)).then(answers => {
  template.copyTo(destinationRoot, answers, () => {
    console.log("daab initialized.");
  });
});
