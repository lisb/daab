#!/usr/bin/env node
// daab init

const program = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const { Template } = require("./template");

program
  .option("--no-prompt", "not ask questions to fill items, use preset values")
  .allowUnknownOption()
  .parse(process.argv);

const prompt = program.prompt !== false;

const start = (template, defaults, prompt) => {
  if (prompt) {
    return inquirer.prompt(template.questions(defaults));
  } else {
    return Promise.resolve(template.daabStarter);
  }
};

const template = new Template();
const destinationRoot = process.cwd();
const defaults = {
  packageName: path.basename(destinationRoot)
};

start(template, defaults, prompt).then(answers => {
  template.copyTo(destinationRoot, answers, () => {
    console.log("daab initialized.");
  });
});
