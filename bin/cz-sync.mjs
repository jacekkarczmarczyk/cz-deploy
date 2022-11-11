#!/usr/bin/env node

import mergeBranches from '../lib/syncBranches.mjs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

const yargv = yargs(hideBin(process.argv)).argv;
const devBranch = yargv.dev || 'dev';
const masterBranch = yargv.master || 'master';
const { push } = yargv;
const { pushTags } = yargv;

mergeBranches(devBranch, masterBranch, push, pushTags).then(() => {
  console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${devBranch} and ${masterBranch} branches`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
