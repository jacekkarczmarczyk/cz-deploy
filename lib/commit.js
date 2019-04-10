const git = require('simple-git')('.');
const addTag = require('./addTag');
const gitAsync = require('./gitAsyc');

module.exports = async function commit (version, chore = 'release') {
  const commitMessage = `chore(${chore}): v${version}`;
  const tag = `v${version}`;

  const indexCheck = await gitAsync('ls-files -m');
  if (indexCheck !== null) {
    console.log(indexCheck);
    throw new Error();
  }

  return new Promise(resolve => git.commit(commitMessage, async () => {
    await addTag(version);
    resolve({
      commitMessage,
      tag,
    });
  }));
};