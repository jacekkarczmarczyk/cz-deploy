const fs = require('fs');
const git = require('simple-git')('.');

module.exports = function addTag (packageJsonPath) {
  const version = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  })).version;
  const tag = `v${version}`;

  return new Promise(resolve => git.addTag(tag, () => resolve(tag)));
};
