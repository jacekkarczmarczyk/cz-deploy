import { simpleGit } from 'simple-git';
const git = simpleGit('.');

export default function addTag (version) {
  const tag = `v${version}`;

  return git.addTag(tag).then(() => tag);
};
