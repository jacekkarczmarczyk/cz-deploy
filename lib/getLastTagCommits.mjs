import getTags from './getTags.mjs';
import getCommits from './getCommits.mjs';

export default async function getLastTagCommits () {
  const tags = await getTags();

  if (tags.length < 2) return [];

  return getCommits(tags[tags.length - 2], tags[tags.length - 1]);
}
