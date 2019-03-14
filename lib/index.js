const git = require('simple-git')('.');
const semver = require('semver');
const fs = require('fs');

/**
 *
 * @returns {Promise<string[]>}
 */
function getCommits () {
  return new Promise(resolve => {
    git.log(['--oneline', 'master..dev'], function (_, {all}) {
      const commits = all[0].hash.split('\n').map(line => line.replace(/[^ ]+ /, ''));
      resolve(commits);
    });
  });
}

/**
 *
 * @param {string[]} commits
 * @returns {string}
 */
function getReleaseType (commits) {
  for (const line of commits) {
    if (line.match(/^breaking/)) return 'major';
    if (line.match(/^feat/)) return 'minor';
  }
  return 'patch';
}

/**
 *
 * @param {string} currentVersion
 * @param {string[]} commits
 * @returns {null|undefined}
 */
function getNewVersion (currentVersion, commits) {
  const releaseType = getReleaseType(commits);
  const newVersion = semver.inc(currentVersion, releaseType);

  if (newVersion === null) {
    throw new Error('Invalid version');
  }

  return newVersion;
}

/**
 *
 * @param {string} packageJsonPath
 * @returns {Promise}
 */
function commitNewVersion (packageJsonPath) {
  const version = JSON.parse(fs.readFileSync(packageJsonPath)).version;

  return new Promise(resolve => git.add(packageJsonPath, function () {
    git.commit(`chore(release): v${version}`, function () {
      git.addTag(`v${version}`, resolve);
    });
  }));
}

/**
 *
 * @param {string} packageJsonPath
 * @returns {Promise<void>}
 */
module.exports = async function release (packageJsonPath) {
  const commits = await getCommits();
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

  console.log();

  console.log(`[cz-release] Current version v${packageJson.version}.`);
  packageJson.version = getNewVersion(packageJson.version, commits);

  console.log(`[cz-release] Publishing v${packageJson.version}. ${commits.length} commit(s):`);
  for (const line of commits) {
    console.log(`[cz-release] COMMIT ${line}`);
  }
  console.log();

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  await commitNewVersion(packageJsonPath);
};
