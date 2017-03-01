#!/usr/bin/env node
// daab invites

var fs = require('fs');
var program = require('commander');
var read = require('read');
var auth = require('./auth');
var direct = require("direct-js").DirectAPI.getInstance();
var proxyURL = process.env.HUBOT_DIRECT_PROXY_URL || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

program
  .allowUnknownOption()
  .parse(process.argv);

if (!auth.hasToken()) {
  console.log('You must have an access token. Try to login.');
  process.exit(1);
}

const tokenKey = 'HUBOT_DIRECT_TOKEN';
const envFile = '.env';
const env = fs.readFileSync(envFile, { encoding: 'utf8' });
const accessToken = env.substr((tokenKey + '=').length).trim();

direct.setOptions({
  host:         'api.direct4b.com',
  endpoint:     'wss://api.direct4b.com/albero-app-server/api',
  proxyURL:     proxyURL,
  access_token: accessToken
});
direct.listen();

direct.on('data_recovered', () => {
  direct.getDomainInvites((invites) => {
    if (!Array.isArray(invites) || invites.length < 1) {
      console.log('No invite.');
      return;
    }

    console.log('#: name');
    invites.
      filter((e) => !e.accountControlRequestId).
        forEach((e, i) => console.log(`${i}: ${e.name}`));

    read({ prompt: 'Input a number to accept an invitation (quit: q): ', default: 'q' }, (err, val) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      const index = parseInt(val, 10);
      if (typeof index === 'number' && !isNaN(index)) {
        if (0 <= index && index < invites.length) {
          direct.acceptDomainInvite(invites[index].id);
        } else {
          console.log(`Index out of bounds: input = ${index}`);
          process.exit(1);
        }
      } else {
        process.exit();
      }
    });
  });
});

direct.on('notify_join_domain', ([, domain]) => {
  console.log(`'${domain.domainInfo.name}' invite accepted completely.`);
  process.exit();
});
