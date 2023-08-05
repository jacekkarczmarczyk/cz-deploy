import { simpleGit } from 'simple-git';

const git = simpleGit('.');

export default async function getCommits (from, to) {
  const { all } = await git.log(['--oneline', `${from}..${to}`]);

  return all.length ? all[0].hash.split('\n').map(line => line.replace(/[^ ]+ /, '')) : [];
}
