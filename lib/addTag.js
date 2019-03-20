const git = require('simple-git')('.');

module.exports = function addTag (version) {
  const tag = `v${version}`;

  return new Promise(resolve => git.addTag(tag, () => resolve(tag)));
};
