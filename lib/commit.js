const git = require('simple-git')('.');
const addTag = require('./addTag');

module.exports = async function commit (version, chore = 'release') {
  const tag = `v${version}`;
  const commitMessage = `chore(${chore}): ${tag}`;

  const indexCheck = await git.raw(['ls-files', '-m']);
  if (indexCheck) {
    throw new Error('Uncommited changes:\n' + indexCheck);
  }

  await git.commit(commitMessage);
  await addTag(version);

  return { commitMessage, tag };
};
