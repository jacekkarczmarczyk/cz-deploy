const fs = require('fs');
const addTag = require('./util/addTag');
const log = console.log;

module.exports = function release (packageJsonPath) {
  const version = JSON.parse(fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  })).version;

  log(`[cz-release] Adding tag v${version}.`);
  return addTag(version);
};
