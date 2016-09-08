
var spawn = require('child_process').spawn;

function git(cmd, args, done) {
  spawn('git', [cmd].concat(args), { stdio:'inherit' })
    .on('error', function(e) { errorHandler(e, cmd, args); })
    .on('exit', done);
}

function errorHandler(e, cmd, args) {
  if (e.code == 'ENOENT') {
    console.log('Please install git before running this command.');
    process.exit();
  } else {
    console.log('git', cmd, args);
    throw e;
  }
}

function register(cmd) {
  return function(args, done) { git(cmd, args, done); };
}

['init', 'checkout', 'pull', 'push', 'reset', 'remote']
.forEach(function(cmd) {
  exports[cmd] = register(cmd);
});

