const git = require('simple-git')('.');

module.exports = command => new Promise((resolve, reject) => {
  git.raw(command.split(' '), (error, result) => error ? reject(error) : resolve(result));
});
