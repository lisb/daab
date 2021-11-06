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
new Arborist().loadActual().then((tree) =>
  packages
    .map(p => tree.children.get(p))
    .filter(p => p != null)
    .map(p => ({ name: p.name, version: p.version }))
    .sort((l, r) => {
      if (l.name > r.name) {
        return +1;
      }
      if (l.name < r.name) {
        return -1;
      }
      return 0;
    })
).then(ps => {
  ps.forEach(found => {
    console.info(`${found.name}:`, found.version);
  });
});
