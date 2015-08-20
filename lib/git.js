
var spawn = require('child_process').spawn;

function git(cmd, args, done) {
  spawn('git', [cmd].concat(args), { stdio:'inherit' })
    .on('error', function(e) { console.log('git', args); throw e; })
    .on('exit', done);
}

function register(cmd) {
  return function(args, done) { git(cmd, args, done); };
}

var cmds = ['init', 'checkout', 'pull', 'push', 'reset', 'remote'];
for (var i = 0, len = cmds.length; i < len; i++) {
  exports[cmds[i]] = register(cmds[i]);
}

