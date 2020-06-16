#!/usr/bin/env node

const fs = require('fs');
const commit = require('../lib/commit');
const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';
const chore = yargv['chore'] || 'release';
const version = JSON.parse(fs.readFileSync(packageJsonPath, {
  encoding: 'utf-8',
})).version;

commit(version, chore).then(({ commitMessage, tag }) => {
  console.log(`[cz-deploy] Commited "${commitMessage}", added tag "${tag}".`);
}).catch(e => {
  console.error(`[cz-deploy]`, e);
  process.exit(1);
});
