import { simpleGit } from 'simple-git';
const git = simpleGit('.');

export default async function getCommits () {
  const refs = await git.raw('for-each-ref --sort=creatordate --format \'%(refname)\' refs/tags'.split(' '));

  return refs.split('\n').filter(v => v).map(ref => ref.replace(/^'refs\/tags\/(.*)'$/, '$1'));
};
