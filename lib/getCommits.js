const git = require('simple-git')('.');

module.exports = function getCommits (from = 'master', to = 'dev') {
  return new Promise(resolve => {
    git.log(['--oneline', `${from}..${to}`], function (_, {all}) {
      const commits = all[0].hash.split('\n').map(line => line.replace(/[^ ]+ /, ''));
      resolve(commits);
    });
  });
};
