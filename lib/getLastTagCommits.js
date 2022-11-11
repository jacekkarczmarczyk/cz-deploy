import getTags from './getTags';
import getCommits from './getCommits';

export default async function getLastTagCommits () {
  const tags = await getTags();

  if (tags.length < 2) return [];

  return getCommits(tags[tags.length - 2], tags[tags.length - 1]);
}
