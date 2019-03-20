const git = require('simple-git')('.');
const fs = require('fs');
const addTag = require('./addTag');

module.exports = function commitNewVersion (packageJsonPath) {
  const version = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  })).version;

  return new Promise(resolve => git.add(packageJsonPath, function () {
    git.commit(`chore(release): v${version}`, function () {
      addTag(`v${version}`).then(resolve);
    });
  }));
};
