const getTags = require('./getTags');
const getCommits = require('./getCommits');

module.exports = async function getLastTagCommits () {
  const tags = await getTags();

  if (tags.length < 2) return [];
  return await getCommits(tags[tags.length - 2], tags[tags.length - 1]);
};
