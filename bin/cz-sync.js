#!/usr/bin/env node

const mergeBranches = require('../lib/syncBranches');
const yargv = require('yargs').argv;
const devBranch = yargv.dev || 'dev';
const masterBranch = yargv.dev || 'master';
const push = yargv.push;
const pushTags = yargv.pushTags;

mergeBranches(devBranch, masterBranch, push, pushTags).then(() => {
  console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${devBranch} and ${masterBranch} branches`);
}).catch(e => {
  console.error(`[cz-deploy]`, e);
  process.exit(1);
});
