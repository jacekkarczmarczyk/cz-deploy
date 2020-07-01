#!/usr/bin/env node

const fs = require('fs');
const commit = require('../lib/commit');
const mergeBranches = require('../lib/syncBranches');
const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';
const chore = yargv['chore'] || 'release';
const push = yargv.push;
const pushTags = yargv.pushTags;
const devBranch = yargv.dev || 'dev';
const masterBranch = yargv.dev || 'master';
const version = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' })).version;

commit(version, chore).then(async ({ commitMessage, tag }) => {
  if (push || pushTags) {
    await mergeBranches(devBranch, masterBranch, push, pushTags);
    console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${devBranch} and ${masterBranch} branches`);
  }
  console.log(`[cz-deploy] Commited "${commitMessage}", added tag "${tag}".`);
}).catch(e => {
  console.error(`[cz-deploy]`, e);
  process.exit(1);
});
