const gitAsync = require('./gitAsyc');

module.exports = async function mergeBranches (devBranch = 'dev', masterBranch = 'master', push = false, pushTags = false) {
  await gitAsync(`checkout ${masterBranch}`);
  await gitAsync(`merge ${devBranch}`);
  push && await gitAsync('push');

  await gitAsync(`checkout ${devBranch}`);
  await gitAsync(`merge ${masterBranch}`);
  push && await gitAsync('push');

  pushTags && await gitAsync('push --tags');
};
