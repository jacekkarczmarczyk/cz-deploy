export default function getReleaseType (commits) {
  for (const line of commits) {
    if (line.match(/^breaking/)) return 'major';
    if (line.match(/^feat/)) return 'minor';
  }

  return 'patch';
}
