const fs = require('fs');
const getCommits = require('./util/getCommits');
const getNewVersion = require('./util/getNewVersion');
const commitNewVersion = require('./util/commitNewVersion');
const log = console.log;

module.exports = async function release (packageJsonPath, noCommit) {
  const commits = await getCommits();
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  }));
  const currentVersion = packageJson.version;

  log();
  log(`[cz-release] ${commits.length} commit(s) since v${currentVersion}, publishing v${packageJson.version}. :`);
  for (const line of commits) {
    log(`[cz-release] COMMIT ${line}`);
  }
  log();

  packageJson.version = getNewVersion(packageJson.version, commits);
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  noCommit || await commitNewVersion(packageJsonPath);
};
