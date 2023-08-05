export default function getReleaseType (commits) {
  let major = false;
  let minor = false;

  for (const line of commits) {
    if (line.match(/^(feat|fix|chore|refactor)!/)) major = true;
    if (line.match(/^feat/)) minor = true;
  }

  if (major) return 'major';

  if (minor) return 'minor';

  return 'patch';
}
