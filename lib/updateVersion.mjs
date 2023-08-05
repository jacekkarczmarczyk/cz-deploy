import fs from 'fs';
import getCommits from './getCommits.mjs';
import getNewVersion from './getNewVersion.mjs';

export default async function updateVersion (packageJsonPath, productionBranch, developmentBranch, dryRun) {
  const commits = await getCommits(productionBranch, developmentBranch);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  }));
  const previous = packageJson.version;
  const next = getNewVersion(packageJson.version, commits);

  if (!dryRun) {
    fs.writeFileSync(packageJsonPath, JSON.stringify({
      ...packageJson,
      version: next,
    }, null, 2) + '\n');
  }

  return {
    previous,
    next,
    commits,
  };
}
