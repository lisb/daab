#!/usr/bin/env node
// daab version

const program = require('commander');
const Arborist = require('@npmcli/arborist');

program.parse(process.argv);

console.info('node:', process.version);
console.info('arch:', process.arch);
console.info('platform:', process.platform);

const packages = [
  'lisb-hubot',
  'hubot-direct',
  'direct-js',
];

new Arborist().loadActual().then((tree) => {
  const getVersion = (i) => i != null ? i.version : '';
  const ps = packages.sort().map(name => ({ name, version: getVersion(tree.children.get(name)) }));
  ps.forEach(p => {
    console.info(`${p.name}:`, p.version);
  });
});
