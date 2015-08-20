
var tokenKey = 'HUBOT_DIRECT_TOKEN';
var envFile = '.env';

var fs = require('fs');

function hasToken() {
  if (process.env[tokenKey]) return true;
  try {
    return fs.readFileSync(envFile, { encoding: 'utf8' }).indexOf(tokenKey + '=') >= 0;
  } catch (e) {
    return false;
  }
}

function setToken(token) {
  var value = (token) ? /*add*/(tokenKey + '=' + token) : /*del*/'';

  var text = '';
  try {
    text = fs.readFileSync(envFile, { encoding: 'utf8' });
  } catch (e) {
  }

  if (text.indexOf(tokenKey) >= 0) {
    text = text.replace(new RegExp(tokenKey + '=.*$', "m"), value);
  } else {
    if (text.length > 0 && text.charAt(text.length - 1) != '\n') text += '\n';
    text = text + value + '\n';
  }

  fs.writeFileSync(envFile, text);
}

module.exports = {
  hasToken: hasToken,
  setToken: setToken
};


