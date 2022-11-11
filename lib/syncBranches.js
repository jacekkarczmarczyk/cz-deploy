import { simpleGit } from 'simple-git';
const git = simpleGit('.');

export default async function mergeBranches (devBranch = 'dev', masterBranch = 'master', push = false, pushTags = false) {
  await git.raw(['checkout', masterBranch]);
  await git.raw(['merge', devBranch]);
  push && await git.raw(['push']);

  await git.raw(['checkout', devBranch]);
  await git.raw(['merge', masterBranch]);
  push && await git.raw(['push']);

  pushTags && await git.raw(['push', '--tags']);
};
