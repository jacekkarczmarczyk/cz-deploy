const git = require('simple-git')('.');
const addTag = require('./addTag');

module.exports = async function commit (version, chore = 'release') {
  const commitMessage = `chore(${chore}): v${version}`;
  const tag = `v${version}`;

  return new Promise(resolve => git.commit(commitMessage, async () => {
    await addTag(version);
    resolve({
      commitMessage,
      tag,
    });
  }));
};
