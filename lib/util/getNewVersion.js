const semver = require('semver');
const getReleaseType = require('./getReleaseType');

module.exports = function getNewVersion (currentVersion, commits) {
  const releaseType = getReleaseType(commits);
  const newVersion = semver.inc(currentVersion, releaseType);

  if (newVersion === null) {
    throw new Error('Invalid version');
  }

  return newVersion;
};
