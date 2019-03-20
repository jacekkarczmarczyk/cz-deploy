const fs = require('fs');
const getCommits = require('./getCommits');
const getNewVersion = require('./getNewVersion');

module.exports = async function updateVersion (packageJsonPath) {
  const commits = await getCommits();
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  }));
  const previous = packageJson.version;
  const next = getNewVersion(packageJson.version, commits);

  fs.writeFileSync(packageJsonPath, JSON.stringify({
    ...packageJson,
    version: next,
  }, null, 2) + '\n');

  return {
    previous,
    next,
    commits,
  }
};
