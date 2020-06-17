const git = require('simple-git')('.');

module.exports = async function getCommits (from = 'master', to = 'dev') {
  const { all } = await git.log(['--oneline', `${from}..${to}`]);

  return all.length ? all[0].hash.split('\n').map(line => line.replace(/[^ ]+ /, '')) : [];
};
