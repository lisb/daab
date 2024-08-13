#!/usr/bin/env node
// daab version

const program = require('commander');
const Arborist = require('@npmcli/arborist');

program.parse(process.argv);

console.info('node:', process.version);
console.info('arch:', process.arch);
console.info('platform:', process.platform);

const packages = {
  'lisb-hubot': [],
  'hubot-direct': ['direct-js'],
};

new Arborist().loadActual().then((tree) => {
  Object.keys(packages)
    .reduce((acc, key) => {
      const node = tree.children.get(key);
      if (!node) {
        return acc;
      }

      acc.push(makePackageInfo(node));

      if (packages[node.name].length === 0) {
        return acc;
      }

      const children = packages[node.name].map((n) => ({
        name: n,
        node: node.children.get(n),
      }));
      const found = children.filter((c) => c.node != null);

      acc.push(...found.map((c) => makePackageInfo(c.node)));
      if (children.length > found.length) {
        acc.push(...children.filter((c) => c.node == null).map((c) => tree.children.get(c.name)));
      }

      return acc;
    }, [])
    .sort(compareName)
    .forEach(printPackageInfo);
});

const getValue = (n, k) => (n != null ? n[k] : undefined);

const makePackageInfo = (n) => {
  return ['name', 'version'].reduce((acc, k) => Object.assign(acc, { [k]: getValue(n, k) }), {});
};

const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return +1;
  }
  return 0;
};

const printPackageInfo = (pi) => console.info(`${pi.name}: ${pi.version}`);
