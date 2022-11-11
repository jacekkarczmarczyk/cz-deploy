import semver from 'semver';
import getReleaseType from './getReleaseType.mjs';

export default function getNewVersion (currentVersion, commits) {
  const releaseType = getReleaseType(commits);
  const newVersion = semver.inc(currentVersion, releaseType);

  if (newVersion === null) {
    throw new Error('Invalid version');
  }

  return newVersion;
}
