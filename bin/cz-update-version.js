#!/usr/bin/env node

const updateVersion = require('../lib/updateVersion');
const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';

updateVersion(packageJsonPath).then(({ previous, next, commits }) => {
  console.log(`[cz-deploy] ${commits.length} commit(s) since v${previous}:`);
  commits.forEach(line => console.log(`[cz-deploy] COMMIT ${line}`));
  console.log(`[cz-deploy] Updated ${packageJsonPath} to v${next}.`);
}).catch(e => {
  console.error(`[cz-deploy]`, e);
  process.exit(1);
});
