
var spawn = require('child_process').spawn;

function git(cmd, args, done) {
  spawn('git', [cmd].concat(args), { stdio:'inherit' })
    .on('error', function(e) { console.log('git', args); throw e; })
    .on('exit', done);
}

function register(cmd) {
  return function(args, done) { git(cmd, args, done); };
}

['init', 'checkout', 'pull', 'push', 'reset', 'remote']
.forEach(function(cmd) {
  exports[cmd] = register(cmd);
});

