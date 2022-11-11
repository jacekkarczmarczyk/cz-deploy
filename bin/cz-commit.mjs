#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';
import commit from '../lib/commit.mjs';
import mergeBranches from '../lib/syncBranches.mjs';

const yargv = yargs.argv;
const packageJsonPath = yargv._[0] || './package.json';
const chore = yargv.chore || 'release';
const { push } = yargv;
const { pushTags } = yargv;
const devBranch = yargv.dev || 'dev';
const masterBranch = yargv.master || 'master';
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));

commit(version, chore).then(async ({ commitMessage, tag }) => {
  if (push || pushTags) {
    await mergeBranches(devBranch, masterBranch, push, pushTags);
    console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${devBranch} and ${masterBranch} branches`);
  }
  console.log(`[cz-deploy] Commited "${commitMessage}", added tag "${tag}".`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
