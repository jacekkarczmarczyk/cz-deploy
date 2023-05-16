export default function getReleaseType (commits) {
  for (const line of commits) {
    if (line.match(/^(feat|fix|chore|refactor)!/)) return 'major';
    if (line.match(/^feat/)) return 'minor';
  }

  return 'patch';
}
