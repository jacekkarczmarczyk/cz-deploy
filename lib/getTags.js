const gitAsync = require('./gitAsyc');

module.exports = async function getCommits () {
  const refs = await gitAsync('for-each-ref --sort=creatordate --format \'%(refname)\' refs/tags');

  return refs.split('\n').map(ref => ref.replace(/^'refs\/tags\/(.*)'$/, '$1'));
};
