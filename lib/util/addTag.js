const git = require('simple-git')('.');

module.exports = function addTag (version) {
  return new Promise(resolve => git.addTag(`v${version}`, resolve));
};
