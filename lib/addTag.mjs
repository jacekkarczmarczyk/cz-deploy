import { simpleGit } from 'simple-git';

const git = simpleGit('.');

export default async function addTag (version) {
  const tag = `v${version}`;

  await git.addTag(tag);

  return tag;
}
