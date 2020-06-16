const git = require('simple-git')('.');

module.exports = function addTag (version) {
  const tag = `v${version}`;

  return git.addTag(tag).then(() => tag);
};
