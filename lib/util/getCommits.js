const git = require('simple-git')('.');

module.exports = function getCommits () {
  return new Promise(resolve => {
    git.log(['--oneline', 'master..dev'], function (_, {all}) {
      const commits = all[0].hash.split('\n').map(line => line.replace(/[^ ]+ /, ''));
      resolve(commits);
    });
  });
};
