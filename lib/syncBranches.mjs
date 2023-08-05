import { simpleGit } from 'simple-git';

const git = simpleGit('.');

export default async function mergeBranches (developmentBranch, productionBranch, push = false, pushTags = false) {
  await git.raw(['checkout', productionBranch]);
  await git.raw(['merge', developmentBranch]);
  push && await git.raw(['push']);

  await git.raw(['checkout', developmentBranch]);
  await git.raw(['merge', productionBranch]);
  push && await git.raw(['push']);

  pushTags && await git.raw(['push', '--tags']);
}
